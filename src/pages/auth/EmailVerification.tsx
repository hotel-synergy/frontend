import { toast } from 'react-toastify';
import VerifyEmailStyle from '../../styles/email.module.css'
import { useState } from 'react';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

function EmailVerification() {
  const urlsearch = new URLSearchParams(document.location.search);
  const token = urlsearch.get('token');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = async () => {
    setLoading(true)
    const requestVerification = await fetch(import.meta.env.VITE_API_URL + 'auth/verify', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({token})
    });
    setLoading(false);
    if (requestVerification.status === 200) {
      toast.success('Email verified successfully.');
      return navigate('/auth/login');
    }
    if (requestVerification.status === 400) {
      const data = await requestVerification.json();
      toast.error(data.msg);
    }
    if (requestVerification.status === 404) {
      toast.error('The user is invalid.');
    }
    if (requestVerification.status === 500) {
      toast.error('Unknown server error.')
    }
  }
  return <section>
    {loading && <Loading/>}
    <form onSubmit={(e) => {
      e.preventDefault();
      handleFormSubmit();
    }} className={VerifyEmailStyle.container}>
      <h1 className={VerifyEmailStyle.title}>Verify Your Email</h1>
      <p>Please click the button below to verify your email address.</p>
      <button className={VerifyEmailStyle.button}>Verify Email</button>
    </form>
  </section>;
}

export default EmailVerification;
