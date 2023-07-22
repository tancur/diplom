import { useState } from "react";
import styles from "./Loader.module.css";
import { CircularProgress } from "@mui/material";
import { API_URL } from "../../api/shopApiUrl";
import { useDispatch, useSelector } from "react-redux";
import { promiseReducer } from "../../store/promiseReduser";
import { actionPromise } from "../../store/promiseReduser";
import { uploadPost } from "../../api/upload";

export function FileUploader() {
  const dispatch = useDispatch();
  const file = useSelector((state) => state.query.file);
  console.log(file);

  const [isLoading, setIsLoading] = useState(false);

  // стейт для отображения загружаемых файлов

  const [fileURL, setFileURL] = useState("");
  const [fileId, setFileId] = useState("");
  const [dragEnter, setDragEnter] = useState(false);

  const dragEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };

  const postFiles = async (file) => {
    const formData = new FormData();

    formData.append("photo", file);

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {},
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    setFileURL(data.url);
    setFileId(data._id);
  };

  const dropHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    const files = e.dataTransfer.files;

    const formData = new FormData();
    formData.append("photo", files[0]);

    dispatch(actionPromise("file", await uploadPost(formData)));
    // console.log(files);
    setIsLoading(false);
  };

  const FileUploaderHandler = async (e) => {
    setIsLoading(true);

    const files = e.target.files;

    const formData = new FormData();
    formData.append("photo", files[0]);
    dispatch(actionPromise("file", uploadPost(formData)));
    setIsLoading(false);
    console.log(files)
  };

  return (
    <>
      <div>
        {!dragEnter ? (
          <div
            className={styles.label}
            onDragEnter={(e) => dragEnterHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragEnterHandler(e)}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <label>
                Загрузите свой файл
                <br />
                (.jpg, .jpeg, .png, .pdf)
                <input
                  className={styles.input}
                  //  accept=".jpg, .jpeg, .png, .pdf"
                  multiple={true}
                  onChange={(e) => FileUploaderHandler(e)}
                  type="file"
                />
              </label>
            )}
          </div>
        ) : (
          <div
            className={styles.label}
            onDragEnter={(e) => dragEnterHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragEnterHandler(e)}
            onDrop={(e) => dropHandler(e)}
          >
            брось файл сюда
          </div>
        )}
        {fileURL && (
          <div>
            <img src={`${API_URL}/${fileURL}`} />
          </div>
        )}
      </div>
    </>
  );
}
