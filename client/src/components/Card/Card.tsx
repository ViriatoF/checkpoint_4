import type UserI from "../../types/user";

function Card({ firstname, lastname, phone, email, matricule, role }: UserI) {
  return (
    <>
      <section>
        <p>{firstname}</p>
        <p>{lastname}</p>
        <p>{phone}</p>
        <p>{email}</p>
        <p>{matricule}</p>
        <p>{role}</p>
      </section>
    </>
  );
}

export default Card;
