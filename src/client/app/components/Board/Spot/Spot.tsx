export default function Spot(props:any) {
    const buttonStyle = {
    left: props.y + "%",
    backgroundColor: props.disabled ? "#ccc" : "rgb(213, 213, 213)", 
    color: props.disabled ? "#666" : "rgb(28, 28, 28)",
    cursor: props.disabled ? "not-allowed" : "pointer",
  };
      return (
        <button
          id={props.buttonID}
          onClick={props.onSpotClick}
          className="button"
          style={buttonStyle}
          disabled={props.disabled}
          
        >
          {props.value}
        </button>
      );
    }