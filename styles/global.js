import css from "styled-jsx/css";

export default css.global`
  @font-face {
    font-family: "Roboto";
    src: url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap");
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1.15;
    background: #f2f5f8;
  }

  p {
    margin: 0;
  }

  button {
    font-size: 100%;
    line-height: 1.15;
    border: none;
  }

  * {
    box-sizing: border-box;
  }
  .bold {
    font-weight: bold;
  }
  .semi-bold {
    font-weight: 600;
  }
  .text-black {
    color: #22292f;
  }
  .text-lg {
    font-size: 1.125rem;
  }
  .no-underline {
    text-decoration: none;
  }
  .rounded {
    border-radius: 0.25rem;
  }
  .border {
    border-width: 1px;
    border-style: solid;
  }
  .bd-width {
    border-width: 1px;
    border-style: solid;
  }
  .bd-grey-light {
    border-color: rgb(218, 225, 231);
  }
  .mr-2 {
    margin-right: 0.5rem;
  }
  .bg-cover {
    background-size: cover;
  }
  .bg-center {
    background-position: 50%;
  }
  .bg-black {
    background-color: #22292f;
  }
  .bg-turquey {
    background-color: rgb(56, 168, 157);
  }
  .py-6 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  .bg-white {
    background-color: white;
  }
  .shadow-md {
    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12),
      0 2px 4px 0 rgba(0, 0, 0, 0.08);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  }
  .shadow-md-light {
    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
  }
  .w-1\/2 {
    width: 50%;
  }
  .p-4 {
    padding: 1rem;
  }
  .p-3 {
    padding: 0.75rem;
  }
  .text-4xl {
    font-size: 2.25rem;
    margin: 0;
  }
  .text-3xl {
    font-size: 1.875rem;
  }
  .text-center {
    text-align: center;
  }
  .text-grey-darknest {
    color: #3d4852;
  }
  .m-2 {
    margin: 0.5rem;
  }
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  .mb-3 {
    margin-bottom: 0.75rem;
  }
  .font-light {
    font-weight: 300;
  }
  .text-base {
    font-size: 1rem;
  }
  .text-xs {
    font-size: 0.75rem;
  }
  .text-grey-dark {
    color: #8795a1;
  }
  .mb-6 {
    margin-bottom: 1.5rem;
  }
  .font-normal {
    font-weight: 400;
  }
  .w-full {
    width: 100%;
  }
  .text-yellow-darker {
    color: #684f1d;
  }
  .mx-2 {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .mx-4 {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .px-12 {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  .bg-yellow-dark {
    background-color: #f2d024;
  }
  .mb-4 {
    margin-bottom: 1rem;
  }
  .mb-8 {
    margin-bottom: 2rem;
  }
  .input_label {
    display: block;
    color: #606f7b;
    font-size: 0.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .relative {
    position: relative;
  }
  .absolute {
    position: absolute;
  }
  .pr-3 {
    padding-right: 0.75rem;
  }
  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .input-search {
    margin-left: 0.75rem;
    font-size: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 87%;
    appearance: none;
    border: none;
    color: #606f7b;
    line-height: 1.25;
  }
  .grid-container {
    display: flex;
    flex-wrap: wrap;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .pointer {
    cursor: pointer;
  }
  .btn {
    cursor: pointer;
    background-color: #fff;
    color: #3d4852;
    font-size: 100%;
    font-weight: 600;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-width: 1px;
    border-color: #dae1e7;
    border-radius: 0.25rem;

    &:hover {
      background-color: #f2f7fb;
    }
  }
  .flex {
    display: flex;
  }
  .center-self {
    justify-content: center;
  }
  .align-items {
    align-items: center;
  }
  .no-selectable {
    user-select: none;
  }
  .error-text {
    color: #ef5350;
  }
  .space-between {
    justify-content: space-between;
  }
`;
