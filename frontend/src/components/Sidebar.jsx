function Sidebar({ file, onClose }) {
  if (!file) return null;

  return (
    <div
      style={{
        width: "350px",
        height: "100vh",
        overflow: "auto",
        borderLeft: "1px solid #ddd",
        padding: "16px",
        background: "#fff"
      }}
    >
      <button onClick={onClose}>
        Close
      </button>

      <h2>{file.label}</h2>

      <p>
        <strong>Path:</strong>
        <br />
        {file.path}
      </p>

      <p>
        <strong>LOC:</strong>
        {" "}
        {file.loc}
      </p>

      <p>
        <strong>Functions:</strong>
        {" "}
        {file.functions}
      </p>

      <p>
        <strong>Imports:</strong>
        {" "}
        {file.imports}
      </p>

      <p>
        <strong>Size:</strong>
        {" "}
        {file.size}
        {" "}
        bytes
      </p>

      {file.preview && (
        <>
          <h3>Preview</h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "12px"
            }}
          >
            {file.preview}
          </pre>
        </>
      )}
    </div>
  );
}

export default Sidebar;