import "./homepage.css";

function Homepage() {
  return (
    <>
      <main className="home-container">
        <section className="admin-ui">
          <h1>Bienvenue</h1>

          <section className="admin-button">
            <button type="button">Create</button>
          </section>
        </section>
        <section className="user-container">
          <article>
            <section>
              <p>jean</p>
              <p>Peuplu</p>
              <p>jean</p>
              <p>jean</p>
              <p>jean</p>
              <p>jean</p>
            </section>
            <section className="button-section">
              <button type="button">edit</button>
              <button type="button">delete</button>
            </section>
          </article>
          <article>
            <section>
              <p>jean</p>
              <p>Peuplu</p>
              <p>jean</p>
              <p>jean</p>
              <p>jean</p>
              <p>jean</p>
            </section>
            <section className="button-section">
              <button type="button">edit</button>
              <button type="button">delete</button>
            </section>
          </article>
          <article>
            <section>
              <p>jean</p>
              <p>Peuplu</p>
              <p>jean</p>
              <p>jean</p>
              <p>jean</p>
              <p>jean</p>
            </section>
            <section className="button-section">
              <button type="button">edit</button>
              <button type="button">delete</button>
            </section>
          </article>
        </section>
      </main>
    </>
  );
}

export default Homepage;
