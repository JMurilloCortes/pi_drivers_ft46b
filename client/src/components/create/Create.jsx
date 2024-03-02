import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Create.module.css";
import { Navigate, useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: [],
  });
  const [teams, setTeams] = useState([]);
  const [errors, setErrors] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/teams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  useEffect(() => {
    // Realizar validación aquí
    const isValid =
      formData.forename.trim() !== "" &&
      formData.surname.trim() !== "" &&
      formData.nationality.trim() !== "" &&
      formData.image.trim() !== "" &&
      formData.dob.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.teams.length > 0;

    setIsFormValid(isValid);
  }, [formData]);

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    if (value.trim() === "") {
      errorMessage = "Este campo no puede estar vacío";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Object.keys(formData).forEach((key) => {
      validateField(key, String(formData[key]));
    });

    if (isFormValid) {
      axios
        .post("http://localhost:3001/drivers", formData)
        .then((response) => {
          console.log("Conductor creado exitosamente:", response.data);
          setShowSuccessMessage(true);

          setFormData({
            forename: "",
            surname: "",
            nationality: "",
            image: "",
            dob: "",
            description: "",
            teams: [],
          });
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleTeamChange = (event) => {

    const { value } = event.target;
    if(formData.teams.some((val) => val === value)) return
    setFormData((prevFormData) => ({
      ...prevFormData,
      teams: [...prevFormData.teams, value],
    }));
  };

  const handleRemoveTeam = (index) => {
    setFormData((prevFormData) => {
      const updatedTeams = [...prevFormData.teams];
      updatedTeams.splice(index, 1);
      return { ...prevFormData, teams: updatedTeams };
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      {showSuccessMessage && (
        <div className={styles.successMessage}>
          Driver created successfully!
        </div>
      )}
      <div onClick={handleBack} className={styles.buttonsDivs}>
        <b>Back</b>
      </div>
      <div>
        <h1 className={styles.colorTittle}>Create New Driver</h1>
      </div>
      <div className={styles.forma}>
        <form onSubmit={handleSubmit}>
          <div className={styles.entrada}>
            <div>
              <label>
                <b>Name:</b>
              </label>
              <input
                type="text"
                name="forename"
                value={formData.forename}
                onChange={handleChange}
                onBlur={(event) =>
                  validateField("forename", event.target.value)
                }
              />
              {errors.forename && (
                <div className={styles.centrar} style={{ color: "red" }}>
                  {errors.forename}
                </div>
              )}
            </div>
            <div>
              <label>
                <b>Last name:</b>
              </label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                onBlur={(event) => validateField("surname", event.target.value)}
              />
              {errors.surname && (
                <div className={styles.centrar} style={{ color: "red" }}>
                  {errors.surname}
                </div>
              )}
            </div>
            <div>
              <label>
                <b>Nationality:</b>
              </label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                onBlur={(event) =>
                  validateField("nationality", event.target.value)
                }
              />
              {errors.nationality && (
                <div className={styles.centrar} style={{ color: "red" }}>
                  {errors.nationality}
                </div>
              )}
            </div>
            <div>
              <label>
                <b>Image:</b>
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                onBlur={(event) => validateField("image", event.target.value)}
              />
              {errors.image && (
                <div className={styles.centrar} style={{ color: "red" }}>
                  {errors.image}
                </div>
              )}
            </div>

            <div>
              <label>
                <b>Birthdate:</b>
              </label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                onBlur={(event) => validateField("dob", event.target.value)}
              />
              {errors.dob && (
                <div className={styles.centrar} style={{ color: "red" }}>
                  {errors.dob}
                </div>
              )}
            </div>

            <div className={styles.control}>
              <label>
                <b>Description:</b>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={(event) =>
                  validateField("description", event.target.value)
                }
              />
            </div>
            {errors.description && (
              <div className={styles.centrar} style={{ color: "red" }}>
                {errors.description}
              </div>
            )}

            <div>
              <label>
                <b>Teams:</b>
              </label>
              <select onChange={handleTeamChange}>
                <option value="">Select a teams...</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
              <ul>
                {formData.teams.map((team, index) => (
                  <div key={index} className={styles.marcas}>
                    {team}
                    <button
                      className={styles.removeButton}
                      type="button"
                      onClick={() => handleRemoveTeam(index)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </ul>
              {errors.teams && (
                <div className={styles.centrar} style={{ color: "red" }}>
                  {errors.teams}
                </div>
              )}
            </div>
          </div>
          <button
            className={styles.buttonsDivs}
            type="submit"
            disabled={!isFormValid}
          >
            <b>Create Driver</b>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
