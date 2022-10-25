import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import "./index.css";
function Footer() {
  const [open, setOpen] = useState(false);

  const toggleFooter = () => {
    setOpen(!open);
  };
  return (
    <div className="footer">
      <button id="footer-btn" onClick={toggleFooter}>
        Learn more..
      </button>
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        open={open}
        anchor="bottom"
      >
        <Paper>
          <div className="toggled-footer">
            {" "}
            <p>Copyright Ⓒ PetYard Co</p>
            <p>
              Authors:
              <ul>
                <li>
                  <a href="https://github.com/cultstatue" target={"_blank"}>
                    Maddie Doutt
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/clairecashmore17"
                    target={"_blank"}
                  >
                    Claire Cashmore
                  </a>
                </li>
                <li>
                  <a href="https://github.com/malickbax" target={"_blank"}>
                    Malick Ba
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Alenco98" target={"_blank"}>
                    Franco Melendez
                  </a>
                </li>
              </ul>{" "}
            </p>
            <button id="footer-btn" onClick={toggleFooter}>
              Close
            </button>
          </div>
        </Paper>
      </Drawer>
    </div>
  );
}
export default Footer;
