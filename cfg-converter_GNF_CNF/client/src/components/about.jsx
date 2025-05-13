import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="py-5 text-center about">
        <div className="col-8 mx-auto">
          <h1>CFG Converter</h1>
          <div className="text-start">
            <hr />
            <p>
              This website is a tool that converts context-free grammars to
              different normal forms. Currently, we support following forms:{" "}
              <br />
            </p>
            <ul>
              <li>
                <a
                  className="resource"
                  href="https://www.geeksforgeeks.org/converting-context-free-grammar-chomsky-normal-form/"
                  target={"_blank"}
                >
                  Chomsky normal form (CNF)
                </a>
              </li>
              <li>
                <a
                  className="resource"
                  href="https://www.geeksforgeeks.org/converting-context-free-grammar-greibach-normal-form/"
                  target={"_blank"}
                >
                  Greibach normal form (GNF)
                </a>
              </li>
            </ul>
            <p>
              Before conversion, the grammar gets simplified and redundant rules
              (such as null and unit productions) and unreachable symbols are
              deleted.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
