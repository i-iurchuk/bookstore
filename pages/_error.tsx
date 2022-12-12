function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `${statusCode} Page Not Found`
        : 'Smth went wrong'}
    </p>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  
  return { statusCode };
};

export default Error;
