export default function Spot(props:any) {
      return (
        <button
          id={props.buttonID}
          onClick={props.onSpotClick}
          className="button"
          style={{left: props.y + "%"}}
        >
          {props.value}
        </button>
      );
    }