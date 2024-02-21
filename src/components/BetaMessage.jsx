import React from 'react';

const ApologyMessage = () => {
  return (
    <>
    <div style={styles.container}>
      <div style={styles.message}>
        <p>
          I want to sincerely apologize for any inconvenience caused by 
          the slow runtimes and occasional errors in the beta version of 
          my Chrome extension. As the sole developer behind this project, 
          your experience is of utmost importance to me.
        </p>
        <p>
          This beta release is a testing ground for new features, and 
          I understand that there's room for improvement. I am actively 
          working to address the performance issues you may have encountered.
        </p>
        <p>
          If you come across specific issues or have any suggestions, please 
          don't hesitate to reach out to me directly at <span style={styles.emailLink}>sebastiengdupont@gmail.com</span>. 
          I assure you that I will respond promptly to address any concerns you may have.
        </p>
        <p>
          Thank you for your understanding and for being a part of this 
          beta testing phase. Your support is crucial as I work towards 
          delivering a more polished and reliable Chrome extension experience.
        </p>
        <p>
          Best, Sebastien Dupont
        </p>
      </div>
    </div>

    <div style={styles.container}>
      <div style={styles.message}>
        <p>
          This chrome extension was built using the Chrome.History.API,
          Vite+ReactJS and a Python Flask application for the backend and
          data proccessing. 
        </p>
        <p>
          The slow rendering of graphs is due to the connection
          between the chrome extension and the flask Application
          hosted <a href="render.com">render.com</a> .
        </p>
        <p>
          For my future release I plan to use the ChartJs library available
          in React to eliminate any delay.
        </p>
        <p>
          This Chrome extension is just getting started, and I'd love to hear 
          your thoughts and ideas. Feel free to reach out to me at <span style={styles.emailLink}>sebastiengdupont@gmail.com</span> .
        </p>
      </div>
    </div>

      </>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100vh',
    marginTop: '110px', // Adjust the margin-bottom as needed

    // padding:'20px',
  },
  message: {
    maxWidth: '600px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  emailLink: {
    color: 'blue',
    textDecoration: 'underline',
  },
};

export default ApologyMessage;