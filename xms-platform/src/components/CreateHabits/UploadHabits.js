import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
//import { filesQuery } from "./Files";

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file){
      file
    }
  }
`;

export default function UploadFile () {
  const [uploadFile] = useMutation(uploadFileMutation, {
    //refetchQueries: [{ query: filesQuery }]
  });
  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
// import React from 'react';
// import { Mutation } from 'react-apollo';
// import gql from 'graphql-tag';
// import Dropzone from 'react-dropzone';

// const uploadFileMutation = gql`
//   mutation($file: Upload!) {
//     uploadFile(file: $file)
//   }
// `;
// // export default () => (
//   export default function UploadFile() {
//     return(
//   <Mutation mutation={uploadFileMutation}>
//     {mutate => (
//       <Dropzone onDrop={([file]) => mutate({ variables: { file } })}>
//         <p>Try dropping some files here, or click to select files to upload.</p>
//       </Dropzone>
//     )}
//   </Mutation>
//     )
//   }

// import React from 'react';
// import PropTypes from 'prop-types';
// import { Mutation } from 'react-apollo';
// import gql from 'graphql-tag'
// const UPLOAD_FILE = gql`
//   mutation($file: Upload!) {
//     uploadSingleFile(file: $file) {
//       path
//     }
//   }`;
  
//   const handleChange = async ( event, mutation ) => {
//     const {
//       target: {
//         validity,
//         files: [file],
//       }
//     } = event;
    
//     if (validity.valid) {
//       // Call graphql API
//       const { data: { uploadSingleFile } } = await mutation({
//         mutation: UPLOAD_FILE,
//         variables: { file },
//         fetchPolicy: 'no-cache',
//       });
//       // Use uploadSingleFile response
//     }
//   };
  
//   const UploadFile = ({ onChange, ...rest }) => {
//   return (
//     <Mutation mutation={UPLOAD_FILE} fetchPolicy="no-cache">
//       { (mutation, { loading }) => (
//         <input
//             type="file"
//             required
//             onChange={event => handleChange(event, mutation)} />
          
//       ) }
//     </Mutation>
//   );
// };
// const gql = require('graphql-tag')
// const { Mutation } = require('react-apollo')
 
// const UploadFiles = () => (
//   <Mutation
//     mutation={gql`
//       mutation($files: [Upload!]!) {
//         uploadFiles(files: $files) {
//           success
//         }
//       }
//     `}
//   >
//     {mutate => (
//       <input
//         type="file"
//         multiple
//         required
//         onChange={({ target: { validity, files } }) =>
//           validity.valid && mutate({ variables: { files } })
//         }
//       />
//     )}
//   </Mutation>
// )