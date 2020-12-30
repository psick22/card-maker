import React, { useRef } from 'react';
import styles from './image_file_input.module.css';

const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
  const inputRef = useRef();
  const onButtonClick = e => {
    e.preventDefault();
    inputRef.current.click();
  };
  const onChange = async event => {
    const upload = await imageUploader.upload(event.target.files[0]);
    console.log(upload);
    onFileChange({ name: upload.original_filename, url: upload.url });
  };
  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      <button className={styles.button} onClick={onButtonClick}>
        {name || 'No File'}
      </button>
    </div>
  );
};

export default ImageFileInput;
