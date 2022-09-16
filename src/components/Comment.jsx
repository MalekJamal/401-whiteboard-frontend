import Toast from "react-bootstrap/Toast";

function Comment(props) {
  return (
    <Toast style={{ marginTop: "8px", marginBottom: "8px" }}>
      <Toast.Header>
        <strong className="me-auto">{props.createdBy}</strong>
        <small>{props.date.substring(0, 10)}</small>
      </Toast.Header>
      <Toast.Body>{props.comment}</Toast.Body>
    </Toast>
  );
}

export default Comment;
