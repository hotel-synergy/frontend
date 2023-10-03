import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetupStyle from "../../styles/setup.module.css";
import { toast } from "react-toastify";

function Setup() {
  const navigate = useNavigate();
  const [option, setOption] = useState("loading");
  const [companyInformation, setCompanyInformation] = useState({
    name: "",
    primary_contact: "",
    secondary_contact: "",
    location: "",
  });

  const handleOnCompanySave = () => {
    if (!companyInformation.name) {
      return toast.error("Company Name is required.");
    }
    if (!companyInformation.primary_contact) {
      return toast.error("Primary contact is required.");
    }

    if (!companyInformation.secondary_contact) {
      return toast.error("Secondary contact is required.");
    }
    if (!companyInformation.location) {
      return toast.error("Location is required.");
    }
    return setOption("new2");
  };

  const [adminInformation, setAdminInformation] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnAdminSave = async () => {
    if (!adminInformation.name) {
      return toast.error("Admin name is required.");
    }
    if (!adminInformation.email) {
      return toast.error("Admin email is required");
    }
    if (!adminInformation.password) {
      return toast.error("Admin password is required.");
    }
    if (adminInformation.password.length <= 5) {
      return toast.error("Admin password must be 6 character or longer.");
    }
    if (adminInformation.password != adminInformation.confirmPassword) {
      return toast.error("Confirmation password do not match.");
    }
    setOption("saving");
    const saveInformationRequest = await fetch(
      import.meta.env.VITE_API_URL + "setup/",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          hotel: companyInformation,
          admin: adminInformation,
        }),
      }
    );
    if (saveInformationRequest.status === 200) {
      setOption("done");
    } else if (saveInformationRequest.status === 400) {
      setOption("new1");
      const data = await saveInformationRequest.json();
      return toast.error(data.msg);
    } else {
      setOption("error");
    }
  };

  const getSetupStatus = async () => {
    const requestStat = await fetch(import.meta.env.VITE_API_URL + "setup/", {
      method: "GET",
    });
    if (requestStat.status === 200) {
      window.document.title = "Setup - Hotel Synergy";
      return setOption("new");
    }
    if (requestStat.status === 400) {
      window.document.title = "Already configured - Hotel Synergy";
      return setOption("already");
    }
  };
  useEffect(() => {
    getSetupStatus();
  }, []);

  switch (option) {
    case "loading":
      return <>Loading..</>;

    case "already":
      return (
        <>
          Software is already configured.{" "}
          <a
            href="/auth/login"
            onClick={(e) => {
              e.preventDefault();
              return navigate("/auth/login");
            }}
          >
            Login
          </a>
        </>
      );
    case "new":
      return (
        <>
          <div className={SetupStyle.container}>
            <h1 className={SetupStyle.title}>Welcome to Hotel Synergy!</h1>
            <p className={SetupStyle.description}>
              Thank you for choosing hotel synergy.
            </p>
            <button
              className={SetupStyle.button}
              onClick={() => setOption("new1")}
            >
              Get Started
            </button>
          </div>
        </>
      );
    case "new1":
      return (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return handleOnCompanySave();
            }}
            className={SetupStyle.container}
          >
            <h1 className={SetupStyle.title}>Company Information</h1>
            <p>Please provide some information about your company.</p>
            <div className={SetupStyle.doubleRow}>
              <div className={SetupStyle.twoInput}>
                <input
                  type="text"
                  required
                  name="companyName"
                  placeholder="Company Name"
                  value={companyInformation.name}
                  onChange={(e) =>
                    setCompanyInformation({
                      ...companyInformation,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  required
                  name="companyContact"
                  placeholder="Primary Contact"
                  value={companyInformation.primary_contact}
                  onChange={(e) =>
                    setCompanyInformation({
                      ...companyInformation,
                      primary_contact: e.target.value,
                    })
                  }
                />
              </div>
              <div className={SetupStyle.twoInput}>
                <input
                  type="text"
                  required
                  name="companySecondary"
                  placeholder="Secondary Contact"
                  value={companyInformation.secondary_contact}
                  onChange={(e) =>
                    setCompanyInformation({
                      ...companyInformation,
                      secondary_contact: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  required
                  name="companyLocation"
                  placeholder="Location"
                  value={companyInformation.location}
                  onChange={(e) =>
                    setCompanyInformation({
                      ...companyInformation,
                      location: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <button className={SetupStyle.button}>Continue</button>
          </form>
        </>
      );
    case "new2":
      return (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return handleOnAdminSave();
            }}
            className={SetupStyle.container}
          >
            <h1 className={SetupStyle.title}>Admin Account</h1>
            <p>Please create a account for an administrator.</p>
            <div className={SetupStyle.doubleRow}>
              <div className={SetupStyle.twoInput}>
                <input
                  type="text"
                  required
                  value={adminInformation.name}
                  onChange={(e) =>
                    setAdminInformation({
                      ...adminInformation,
                      name: e.target.value,
                    })
                  }
                  placeholder="Administrator Name"
                />
                <input
                  type="email"
                  required
                  value={adminInformation.email}
                  onChange={(e) =>
                    setAdminInformation({
                      ...adminInformation,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email Address"
                />
              </div>
              <div className={SetupStyle.twoInput}>
                <input
                  type="password"
                  required
                  value={adminInformation.password}
                  onChange={(e) =>
                    setAdminInformation({
                      ...adminInformation,
                      password: e.target.value,
                    })
                  }
                  placeholder="New Password"
                />
                <input
                  type="password"
                  required
                  value={adminInformation.confirmPassword}
                  onChange={(e) =>
                    setAdminInformation({
                      ...adminInformation,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm Password"
                />
              </div>
              <button type="submit" className={SetupStyle.button}>
                Continue
              </button>
            </div>
          </form>
        </>
      );
    case "saving":
      return (
        <>
          <div className={SetupStyle.container}>
            <h1 className={SetupStyle.title}>Please wait..</h1>
            <p>While we create the admin account.</p>
          </div>
        </>
      );
    case "done":
      return (
        <>
          <div className={SetupStyle.container}>
            <h1 className={SetupStyle.title}>Setup Completed</h1>
            <p>The information is saved and software is ready.</p>
            <button
              onClick={() => navigate("/auth/login")}
              className={SetupStyle.button}
            >
              Let's begin
            </button>
          </div>
        </>
      );
    case "error":
      return <>Oops! There was an unknown error.</>;
  }
}

export default Setup;
