export function getSliceArrayBuffer(blob) {
  console.log("blob blob", blob);
  return new Promise((resolve, reject) => {
    let arr = [];
    const r = new FileReader(),
      blobSlice = File.prototype.slice,
      chunkSize = 16384,
      chunks = Math.ceil(blob.size / chunkSize);
    let currentChunk = 0;
    r.onerror = e => {
      console.log("get slice blob error", e);
      reject();
    };
    r.onload = e => {
      arr.push(e.target.result);
      currentChunk++;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        resolve(arr);
      }
    };
    function loadNext() {
      const start = currentChunk * chunkSize;
      const end =
        start + chunkSize >= blob.size ? blob.size : start + chunkSize;
      r.readAsArrayBuffer(blobSlice.call(blob, start, end));
    }
    loadNext();
  });
}

export function blob2DataUrl(blob) {
  return new Promise(resolve => {
    const r = new FileReader();
    r.onload = e => {
      resolve(e.target.result);
    };
    console.log("blob2dataurl", { blob });
    r.readAsDataURL(blob);
  });
}
