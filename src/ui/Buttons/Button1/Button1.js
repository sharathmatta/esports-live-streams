import classes from "./Button1.module.css";

const Button1 = () => {
  return (
    <a class="button" href="/" role="button">
      <span>remove</span>
      <div class="icon">
        <i class="fa fa-remove"></i>
        <i class="fa fa-check"></i>
      </div>
    </a>
  );
};
