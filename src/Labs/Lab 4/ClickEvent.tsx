const hello = () => {
  alert("Hello World!");
};
const lifeIs = (good: string) => {
  alert(`Life is ${good}`);
};
export default function ClickEvent() {
  return (
    <div id="wd-click-event">
      <h2>Click Event</h2>
      <button
        onClick={hello}
        id="wd-hello-world-click"
        className="btn btn-outline-primary mx-1"
      >
        Hello World!
      </button>
      <button
        onClick={() => lifeIs("Good!")}
        id="wd-life-is-good-click"
        className="btn btn-outline-primary mx-1"
      >
        Life is Good!
      </button>
      <button
        onClick={() => {
          hello();
          lifeIs("Awesome!");
        }}
        id="wd-life-is-great-click"
        className="btn btn-outline-primary mx-1"
      >
        Life is Awesome!
      </button>
      <hr />
    </div>
  );
}
