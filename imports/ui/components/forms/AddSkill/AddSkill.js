import React, { useState } from "react";

import { Button, TextField } from "@mui/material";
import { useTracker } from "meteor/react-meteor-data";
import "./style.scss";

const AddSkill = () => {
  const [skill, setskill] = useState("");
  const skills = useTracker(() => {
    return Meteor?.user()?.profile?.skills;
  });
  const handleChange = (e) => {
    setskill(e.target.value);
  };
  const addSkillHandler = () => {
    Meteor.users.update(
      { _id: Meteor.user()._id },
      {
        $set: {
          "profile.skills": [...skills, skill],
        },
      },
      () => {
        setskill("");
      }
    );
  };

  return (
    <>
      <div className="add-skill">
        <div className="add-skill__entry">
          <TextField
            name="skill"
            label="Skill"
            variant="outlined"
            placeholder="Add your skill"
            onChange={handleChange}
            value={skill}
            fullWidth
          ></TextField>
        </div>

        <Button variant="contained" disabled={!skill} onClick={addSkillHandler}>
          Add Skill
        </Button>
      </div>
      <div className="signUpPro__entry">
        <div className="skills">
          {skills.map((skill, idx) => (
            <div className="skill" key={idx}>
              <i className="far fa-lightbulb"></i> {skill}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddSkill;
