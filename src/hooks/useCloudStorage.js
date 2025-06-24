import { gapi } from "gapi-script";

export function useCloudStorage() {
  const init = () => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.file"
      });
    });
  };

  const upload = async (file) => {
    if (!gapi.auth.getToken()) await gapi.auth2.getAuthInstance().signIn();
    const token = gapi.auth.getToken().access_token;
    const metadata = { name: file.name, mimeType: file.type };
    const fd = new FormData();
    fd.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    fd.append("file", file);

    const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
      method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd
    });
    return res.json();
  };

  return { init, upload };
}
