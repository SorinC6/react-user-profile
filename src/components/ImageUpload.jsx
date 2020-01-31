import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Upload, Icon, message } from 'antd';


const ProfileInfo = props => {
  const [image, setImage] = useState('');
  const [imgUrl, setImgUrl] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImgUrl(props.user.profile_picture);
  }, []);

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setImage(info.file.originFileObj);
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false);
        setImgUrl(imageUrl);
      });
    }
  };

  const success = () => {
    message.success('Image update succesfuly');
  };

  const error = () => {
    message.error('Error updating image');
  };

  const handleSubmit = e => {
    e.preventDefault();
    image && setLoading(true);
    const { username } = props.user;
    const imgData = new FormData();
    imgData.append('image', image);
    image &&
      props.imageUpload(imgData, username).then(res => {
        //console.log(res);
        if (res === 200) {
          setLoading(false);
          success();
        } else {
          setLoading(false);
          error();
        }
        // res === 200 ? success() : error();
      });
  };

  return (
    <Image>
      <Root>
        <FormArea onSubmit={handleSubmit}>
          <RoundIcon
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            style={{ fontSize: '30px', padding: '20px' }}
          >
            {imgUrl ? <img src={imgUrl} alt="avatar" /> : uploadButton}
          </RoundIcon>
          {image && (
            <button large primary type="submit" loadingB={loading}>
              Set new Profile Image
            </button>
          )}
        </FormArea>
      </Root>
    </Image>
  );
};


export default ProfileInfo

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  h2 {
    margin: 0 20px;
    text-align: center;
  }
`;

const Image = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
  p {
    margin-left: 1rem;
  }
`;

const RoundIcon = styled(Upload)`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 130px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const FormArea = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (min-width: ${({ theme }) => theme.mobileWidth}) {
    width: 50%;
  }
  textarea {
    padding: 0.5rem;
    font-size: 16px;
    width: 70%;
    height: 120px;
    display: block;
    color: ${({ theme }) => theme.inputPurple};
    border: 1px solid rgba(77, 45, 82, 0.8);
    border-radius: 4px;
    ::placeholder {
      color: grey;
      opacity: 0.4;
    }
  }
`;