
export function Square(props: any) {

    return (
        <button
            className="normal-square"
            onClick={props.onClick}
        >
            <span className={props.winner ? 'winner' : ''}>{props.value}</span>
        </button>
    );
}