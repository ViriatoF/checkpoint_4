import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import Card from "../../components/Card/Card";
import "./homepage.css";
import {
  IoAddOutline,
  IoPencilSharp,
  IoPersonAddSharp,
  IoTrashOutline,
} from "react-icons/io5";
import type UserI from "../../types/user";

function Homepage() {
  const [users, setUsers] = useState<UserI[] | null>([]);
  const [userForm, setUserForm] = useState<boolean>(false);
  const [modify, setModify] = useState<boolean>(false);
  const [user, setUser] = useState<number>(0);

  console.warn(user);

  useEffect(() => {
    displayUsers();
  }, []);

  const displayUsers = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((response) => response.json())
      .then((users) => setUsers(users));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { firstname, lastname, phone, email, matricule, role, password } =
      data;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/create`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            phone,
            email,
            matricule,
            role,
            password,
          }),
        },
      );

      if (response.status === 201) {
        displayUsers();
        setUserForm(!userForm);
      }
    } catch (err) {
      throw new Error("bad request");
    }
  };

  const handleNewUser = () => {
    if (!userForm) {
      setUserForm(!userForm);
    }
  };

  const handleModifyUser = async (e: ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { id, firstname, lastname, phone, email, matricule, role, password } =
      data;

    const userModify = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/update/${user}`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          phone,
          email,
          matricule,
          role,
          password,
          id,
        }),
      },
    );
    if (userModify.status === 201) {
      setModify(!modify);
    }
  };

  const handleModify = () => {
    if (!modify) {
      setModify(!modify);
      // console.log(modify);
    }
  };

  // const handleDelete = () => {
  // };

  return (
    <>
      <main className="home-container">
        <section className="admin-ui">
          <h1>Bienvenue</h1>

          <section className="admin-button">
            <button type="button" onClick={handleNewUser}>
              <IoPersonAddSharp />
            </button>
          </section>
        </section>
        <section className="user-container">
          <article className={userForm === true ? "" : "not-active"}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="firstname">Prénom</label>
              <input type="text" name="firstname" required />

              <label htmlFor="lastname">Nom</label>
              <input type="text" name="lastname" required />

              <label htmlFor="phone">Téléphone</label>
              <input type="tel" name="phone" required />

              <label htmlFor="email">Email</label>
              <input type="email" name="email" required />

              <label htmlFor="matricule">Matricule</label>
              <input type="number" name="matricule" required />

              <label htmlFor="role">Role</label>
              <input type="text" name="role" required />

              <label htmlFor="password">password</label>
              <input type="password" name="password" required />

              <button type="submit">
                <IoAddOutline />
              </button>
            </form>
          </article>
          {users?.map((user: UserI) => {
            return (
              <>
                <article key={user.id}>
                  {modify === true ? (
                    <form onSubmit={handleModifyUser}>
                      <label htmlFor="firstname">Prénom</label>
                      <input
                        type="text"
                        name="firstname"
                        required
                        placeholder={user.firstname}
                      />

                      <label htmlFor="lastname">Nom</label>
                      <input
                        type="text"
                        name="lastname"
                        required
                        placeholder={user.lastname}
                      />

                      <label htmlFor="phone">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder={user.phone}
                      />

                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={user.email}
                      />

                      <label htmlFor="matricule">Matricule</label>
                      <input
                        type="number"
                        name="matricule"
                        required
                        placeholder={user.matricule.toString()}
                      />

                      <label htmlFor="role">Role</label>
                      <input
                        type="text"
                        name="role"
                        required
                        placeholder={user.role}
                      />

                      <label htmlFor="password">password</label>
                      <input
                        type="password"
                        name="password"
                        required
                        placeholder={user.password}
                      />

                      <button type="submit">
                        <IoAddOutline />
                      </button>
                    </form>
                  ) : (
                    <>
                      <Card
                        firstname={user.firstname}
                        lastname={user.lastname}
                        phone={user.phone}
                        email={user.email}
                        matricule={user.matricule}
                        role={user.role}
                      />
                      <section className="button-section">
                        <button
                          type="button"
                          onClick={() => {
                            setUser(Number(user.id));
                            handleModify();
                          }}
                        >
                          <IoPencilSharp />
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            const id = user.id;
                            setUser(Number(id));
                            try {
                              const response = await fetch(
                                `${import.meta.env.VITE_API_URL}/api/user/delete/${id}`,
                                {
                                  method: "delete",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    id,
                                  }),
                                },
                              );

                              if (response.status === 201) {
                                displayUsers();
                              }
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <IoTrashOutline />
                        </button>
                      </section>
                    </>
                  )}
                </article>
              </>
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Homepage;
