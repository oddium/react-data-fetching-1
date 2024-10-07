type ErrorMessageProps = {
    text: string;
};

const ErrorMessage = ({text}:ErrorMessageProps) => {
    return (
        <aside id='error'>
            <h1>An error occured!</h1>
            <p>{text}</p>
        </aside>
    );
}

export default ErrorMessage;