import React, { useState, useMemo, ChangeEvent } from "react";
import { TableColumn } from "react-data-table-component";
import { DataTableBase } from "./components/dataTableBase";
import { FilterComponent } from "./components/filterComponent";
import { CheckboxComponent } from "./components/checkboxComponent";
import { ModalForm } from "./components/modalForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useUsers } from "../../hooks/users"; // Hooks
import { User, defaultUser } from "../../hooks/interfaces"; // Iterfaces
import "./styles/users.scss";

type FormElement = React.FormEvent<HTMLFormElement>;

export function Users() {
  const { user, setUser, users, pending, udpateUser, deleteUser } = useUsers();

  /** Columns of data table (react-data-table-component) */
  const columns: TableColumn<User>[] = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Nombres",
      selector: (row) => row.name,
    },
    {
      name: "Apellidos",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.role,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.role === "admin",
          style: {
            color: "#fff",
          },
        },
      ],
    },
    {
      cell: (row) => (
        <div className="actions-container d-flex justify-content-between">
          <div className="action d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
              onClick={() => modifyUser(row.email)}
              id={row.email}
              icon={faPencilAlt}
            />
          </div>
          <div className="action d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
              onClick={() => deleteUser(row.email)}
              id={row.email}
              icon={faTrashAlt}
            />
          </div>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  /** Modal from visivility*/
  const [visibility, setVisibility] = useState(false);
  /** Pagination on filter*/
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  /**  Fields empty in products form*/
  const [errorMessage, setErrorMessage] = useState("");
  /** Search bar */
  const [filterText, setFilterText] = useState("");
  const filteredItems = users.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  /** Submit product form */
  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();

    const isValid =
      user.email && user.lastName && user.name && user.picture && user.role;
    const errorMessage = !isValid
      ? "Por favor, actualice correctamente los datos del usuario*"
      : "";
    setErrorMessage(errorMessage);

    if (isValid) {
      udpateUser(user.email);
      setUser(defaultUser);
      setVisibility(false);
    }
  };

  /** Changes in form products form*/
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    key: string
  ): void => {
    setErrorMessage("");
    setUser({
      ...user,
      [key]: e.target.value,
    });
  };

  const modifyUser = (email: string): void => {
    setUser(users.find((item) => item.email === email)!);
    setVisibility(true);
  };

  /** Pagination on filter*/
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        placeHolderText={"Buscar por nombre de usuario..."}
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="users d-flex flex-column">
      <div className="table-wrapper">
        <DataTableBase
          title="Usuarios"
          columns={columns}
          data={filteredItems}
          subHeaderComponent={subHeaderComponentMemo}
          selectableRowsComponent={CheckboxComponent}
          progressPending={pending}
        />
      </div>
      <ModalForm
        title={"Agregar productos"}
        visibility={visibility}
        setVisibility={setVisibility}
        setIdEdit={() => undefined}
      >
        <form onSubmit={handleSubmit} className="row g-3 d-flex justify-content-center">
          <div className="user-info-modal d-flex flex-row justify-content-evenly align-items-center">
            <div className="user-image-wapprer">
              <img src={user.picture} alt="user" />
            </div>
            <div className="user-info-specs-wrapper">
              <div className="user-name">
                {user.name} {user.lastName}
              </div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <label htmlFor="inputRole" className="form-label align-self-center">
              Rol del usuario
            </label>
            <select
              onChange={(e) => handleChange(e, "role")}
              value={user.role}
              id="inputRole"
              className="form-select rounded-pill"
            >
              <option defaultValue="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <span className="align-self-center">{errorMessage}</span>
          <div className="col-md-6 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary rounded-pill color-in"
            >
              Actualizar usuario
            </button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
}
