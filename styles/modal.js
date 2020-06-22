import css from "styled-jsx/css";

export default css`
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 350px;
    min-height: 300px;
    background: white;
  }
`;
