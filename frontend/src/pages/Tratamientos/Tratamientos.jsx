import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaHome,
    FaUserInjured,
    FaFolderOpen,
    FaStethoscope,
    FaNotesMedical,
    FaPills,
    FaPrescriptionBottleAlt,
    FaCalendarAlt,
    FaUsers,
    FaClipboardList,
    FaSignOutAlt,
    FaSearch,
    FaEdit,
    FaEye,
    FaTrash,
    FaPlus,
    FaRedo
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import axiosClient from "../../api/axiosConfig";
import logo from "../../assets/logos/medicore-Copy.png";

const Tratamientos = () => {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const esAdmin = usuario?.rol === "ADMIN";
    const esPaciente = usuario?.rol === "PACIENTE";

    const [tratamientos, setTratamientos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        obtenerTratamientos();
    }, []);

    const obtenerTratamientos = async () => {
        try {
            const response = await axiosClient.get("/tratamientos");
            setTratamientos(response.data);
        } catch (error) {
            console.error("Error al obtener tratamientos:", error);
        }
    };

    const confirmarCambioEstado = (tratamiento) => {
        setTratamientoSeleccionado(tratamiento);
        setMostrarModal(true);
    };

    const cambiarEstadoTratamiento = async () => {
        try {
            if (tratamientoSeleccionado.estado === "ACTIVO") {
                await axiosClient.patch(
                    `/tratamientos/${tratamientoSeleccionado.id_tratamiento}/anular`
                );

                setMensaje("Tratamiento anulado correctamente");
            } else {
                await axiosClient.patch(
                    `/tratamientos/${tratamientoSeleccionado.id_tratamiento}/reactivar`
                );

                setMensaje("Tratamiento reactivado correctamente");
            }

            setMostrarModal(false);
            obtenerTratamientos();

            setTimeout(() => {
                setMensaje("");
            }, 3000);

        } catch (error) {
            console.error("Error al cambiar estado:", error);
            setMensaje("Error al cambiar estado del tratamiento");
        }
    };

    const tratamientosFiltrados = tratamientos.filter((tratamiento) => {
        const paciente = `${tratamiento.diagnostico?.consulta?.expediente?.paciente?.nombres || ""} ${tratamiento.diagnostico?.consulta?.expediente?.paciente?.apellidos || ""}`;
        const medico = tratamiento.diagnostico?.consulta?.usuarioMedico?.nombre_completo || "";
        const expediente = tratamiento.diagnostico?.consulta?.expediente?.numero_expediente || "";
        const diagnostico = tratamiento.diagnostico?.descripcion || "";
        const nombre = tratamiento.nombre || "";
        const descripcion = tratamiento.descripcion || "";
        const tipo = tratamiento.tipo || "";

        return (
            paciente.toLowerCase().includes(busqueda.toLowerCase()) ||
            medico.toLowerCase().includes(busqueda.toLowerCase()) ||
            expediente.toLowerCase().includes(busqueda.toLowerCase()) ||
            diagnostico.toLowerCase().includes(busqueda.toLowerCase()) ||
            nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
            tipo.toLowerCase().includes(busqueda.toLowerCase())
        );
    });

    const formatearFecha = (fecha) => {
        if (!fecha) return "N/A";
        return new Date(fecha).toLocaleDateString("es-GT");
    };

    const modulos = esPaciente
        ? [
            { nombre: "Inicio", icono: <FaHome />, ruta: "/dashboard-paciente", visible: true },
            { nombre: "Mis citas", icono: <FaCalendarAlt />, ruta: "/paciente/citas", visible: true },
            { nombre: "Programar cita", icono: <FaPlus />, ruta: "/paciente/citas/crear", visible: true },
            { nombre: "Mi expediente", icono: <FaFolderOpen />, ruta: "/paciente/expediente", visible: true },
            { nombre: "Mis consultas", icono: <FaStethoscope />, ruta: "/paciente/consultas", visible: true },
            { nombre: "Mis recetas", icono: <FaPrescriptionBottleAlt />, ruta: "/paciente/recetas", visible: true },
            { nombre: "Mis tratamientos", icono: <FaPills />, ruta: "/paciente/tratamientos", visible: true }
        ]
        : [
            { nombre: "Inicio", icono: <FaHome />, ruta: "/dashboard", visible: true },
            { nombre: "Pacientes", icono: <FaUserInjured />, ruta: "/pacientes", visible: true },
            { nombre: "Expedientes", icono: <FaFolderOpen />, ruta: "/expedientes", visible: true },
            { nombre: "Consultas", icono: <FaStethoscope />, ruta: "/consultas", visible: true },
            { nombre: "Diagnósticos", icono: <FaNotesMedical />, ruta: "/diagnosticos", visible: true },
            { nombre: "Tratamientos", icono: <FaPills />, ruta: "/tratamientos", visible: true },
            { nombre: "Recetas", icono: <FaPrescriptionBottleAlt />, ruta: "/recetas", visible: true },
            { nombre: "Citas", icono: <FaCalendarAlt />, ruta: "/citas", visible: true },
            { nombre: "Usuarios", icono: <FaUsers />, ruta: "/usuarios", visible: esAdmin },
            { nombre: "Bitácora", icono: <FaClipboardList />, ruta: "/bitacora", visible: esAdmin }
        ];

    const styles = {
        modalOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
        },
        modal: {
            width: "420px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
        },
        modalTitle: {
            fontSize: "24px",
            color: "#102b5c",
            marginBottom: "15px"
        },
        modalText: {
            color: "#5d6b82",
            fontSize: "15px",
            lineHeight: "1.5"
        },
        modalActions: {
            marginTop: "25px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px"
        },
        cancelButton: {
            backgroundColor: "#eef2f7",
            color: "#102b5c",
            border: "none",
            borderRadius: "10px",
            padding: "12px 18px",
            cursor: "pointer",
            fontWeight: "bold"
        },
        confirmButton: {
            backgroundColor: "#eb5757",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            padding: "12px 18px",
            cursor: "pointer",
            fontWeight: "bold"
        },
        popup: {
            position: "fixed",
            top: "25px",
            right: "25px",
            backgroundColor: "#ffffff",
            color: "#102b5c",
            border: "1px solid #dbe3ee",
            borderLeft: "5px solid #27ae60",
            borderRadius: "12px",
            padding: "16px 20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            fontWeight: "bold",
            zIndex: 9999
        },
        layout: {
            display: "flex",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#f5f7fb",
            fontFamily: "'Segoe UI', sans-serif"
        },
        sidebar: {
            width: "250px",
            height: "100vh",
            flexShrink: 0,
            background: "linear-gradient(180deg, #062b5f 0%, #031b3d 100%)",
            color: "#fff",
            padding: "25px 18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "spacmaine-between"
        },
        logo: {
            textAlign: "center",
            marginBottom: "35px"
        },
        logoImage: {
            width: "95px",
            marginBottom: "14px",
            backgroundColor: "#ffffff",
            padding: "10px",
            borderRadius: "14px",
            boxShadow: "0 8px 18px rgba(0,0,0,0.18)"
        },
        logoTitle: {
            fontSize: "28px",
            fontWeight: "bold",
            margin: 0
        },
        logoSubtitle: {
            fontSize: "12px",
            opacity: 0.8,
            marginTop: "8px"
        },
        menuItem: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "13px 14px",
            borderRadius: "8px",
            marginBottom: "8px",
            cursor: "pointer",
            fontSize: "15px",
            color: "#eef4ff"
        },
        activeItem: {
            backgroundColor: "#f4bd4f",
            color: "#08234d",
            fontWeight: "bold"
        },
        logout: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "13px",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
            fontSize: "14px"
        },
        main: {
            flex: 1,
            padding: "25px 35px",
            height: "100vh",
            overflowY: "auto"
        },
        navbar: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e1e7f0",
            paddingBottom: "18px",
            marginBottom: "25px"
        },
        title: {
            fontSize: "30px",
            color: "#102b5c",
            margin: 0
        },
        topActions: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            gap: "20px",
            flexWrap: "wrap"
        },
        searchBox: {
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            border: "1px solid #dbe3ee",
            borderRadius: "10px",
            padding: "0 14px",
            height: "48px",
            width: "430px"
        },
        searchInput: {
            border: "none",
            outline: "none",
            flex: 1,
            fontSize: "14px",
            marginLeft: "10px"
        },
        addButton: {
            backgroundColor: "#0b2c5f",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            padding: "14px 20px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
        },
        tableContainer: {
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            padding: "22px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            border: "1px solid #e8edf5",
            overflowX: "auto",
            marginBottom: "30px"
        },
        table: {
            width: "100%",
            borderCollapse: "collapse"
        },
        th: {
            textAlign: "left",
            padding: "15px",
            backgroundColor: "#f7f9fc",
            color: "#102b5c",
            fontSize: "14px",
            borderBottom: "1px solid #e1e7f0"
        },
        td: {
            padding: "15px",
            borderBottom: "1px solid #edf1f7",
            fontSize: "14px",
            color: "#33415c",
            verticalAlign: "top"
        },
        estadoActivo: {
            backgroundColor: "#dff6e4",
            color: "#1f7a3f",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold"
        },
        estadoInactivo: {
            backgroundColor: "#fde2e2",
            color: "#b42318",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold"
        },
        acciones: {
            display: "flex",
            gap: "10px"
        },
        actionButton: {
            border: "none",
            borderRadius: "8px",
            width: "35px",
            height: "35px",
            cursor: "pointer",
            color: "#ffffff"
        },
        emptyRow: {
            padding: "25px",
            textAlign: "center",
            color: "#6b7890",
            fontSize: "15px"
        },
        descriptionCell: {
            maxWidth: "280px",
            lineHeight: "1.5"
        },
        smallText: {
            fontSize: "12px",
            color: "#6b7890",
            marginTop: "5px"
        }
    };

    return (
        <div style={styles.layout}>
            <aside style={styles.sidebar}>
                <div>
                    <div style={styles.logo}>
                        <img
                            src={logo}
                            alt="MediCore"
                            style={styles.logoImage}
                        />

                        <h2 style={styles.logoTitle}>MediCore</h2>

                        <p style={styles.logoSubtitle}>
                            Sistema de Expediente Clínico Electrónico
                        </p>
                    </div>

                    {modulos
                        .filter((modulo) => modulo.visible)
                        .map((modulo, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(modulo.ruta)}
                                style={{
                                    ...styles.menuItem,
                                    ...(
                                        modulo.ruta === (
                                            esPaciente
                                                ? "/paciente/tratamientos"
                                                : "/tratamientos"
                                        )
                                            ? styles.activeItem
                                            : {}
                                    )
                                }}
                            >
                                {modulo.icono}
                                <span>{modulo.nombre}</span>
                            </div>
                        ))}
                </div>

                <div style={styles.logout} onClick={logout}>
                    <FaSignOutAlt />
                    <span>Cerrar sesión</span>
                </div>
            </aside>

            {mensaje && (
                <div style={styles.popup}>
                    {mensaje}
                </div>
            )}

            {mostrarModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2 style={styles.modalTitle}>
                            {tratamientoSeleccionado?.estado === "ACTIVO"
                                ? "Anular tratamiento"
                                : "Reactivar tratamiento"}
                        </h2>

                        <p style={styles.modalText}>
                            {tratamientoSeleccionado?.estado === "ACTIVO"
                                ? "¿Desea anular este tratamiento? El registro seguirá guardado dentro del expediente clínico."
                                : "¿Desea reactivar este tratamiento clínico?"}
                        </p>

                        <div style={styles.modalActions}>
                            <button
                                style={styles.cancelButton}
                                onClick={() => setMostrarModal(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                style={styles.confirmButton}
                                onClick={cambiarEstadoTratamiento}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main style={styles.main}>
                <nav style={styles.navbar}>
                    <h1 style={styles.title}>
                        {esPaciente ? "Mis Tratamientos Médicos" : "Tratamientos Médicos"}
                    </h1>
                </nav>

                <section style={styles.topActions}>
                    <div style={styles.searchBox}>
                        <FaSearch color="#6b7890" />

                        <input
                            type="text"
                            placeholder="Buscar tratamiento, paciente, médico o expediente..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>

                    {!esPaciente && (
                        <button
                            style={styles.addButton}
                            onClick={() => navigate("/tratamientos/crear")}
                        >
                            <FaPlus />
                            Nuevo Tratamiento
                        </button>
                    )}
                </section>

                <section style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Paciente</th>
                                <th style={styles.th}>Expediente</th>
                                <th style={styles.th}>Médico</th>
                                <th style={styles.th}>Tratamiento</th>
                                <th style={styles.th}>Tipo</th>
                                <th style={styles.th}>Inicio</th>
                                <th style={styles.th}>Estado</th>
                                <th style={styles.th}>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tratamientosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={styles.emptyRow}>
                                        No se encontraron tratamientos médicos.
                                    </td>
                                </tr>
                            ) : (
                                tratamientosFiltrados.map((tratamiento) => (
                                    <tr key={tratamiento.id_tratamiento}>
                                        <td style={styles.td}>
                                            {tratamiento.diagnostico?.consulta?.expediente?.paciente
                                                ? `${tratamiento.diagnostico.consulta.expediente.paciente.nombres} ${tratamiento.diagnostico.consulta.expediente.paciente.apellidos}`
                                                : "Paciente no registrado"}
                                        </td>

                                        <td style={styles.td}>
                                            {tratamiento.diagnostico?.consulta?.expediente?.numero_expediente || "N/A"}
                                        </td>

                                        <td style={styles.td}>
                                            {tratamiento.diagnostico?.consulta?.usuarioMedico?.nombre_completo || "Sin médico"}
                                        </td>

                                        <td style={styles.td}>
                                            <div style={styles.descriptionCell}>
                                                {tratamiento.nombre || tratamiento.descripcion || "Sin descripción"}

                                                <div style={styles.smallText}>
                                                    Diagnóstico: {tratamiento.diagnostico?.descripcion || "No especificado"}
                                                </div>
                                            </div>
                                        </td>

                                        <td style={styles.td}>
                                            {tratamiento.tipo || "N/A"}
                                        </td>

                                        <td style={styles.td}>
                                            {formatearFecha(tratamiento.fecha_inicio)}
                                        </td>

                                        <td style={styles.td}>
                                            <span
                                                style={
                                                    tratamiento.estado === "ACTIVO"
                                                        ? styles.estadoActivo
                                                        : styles.estadoInactivo
                                                }
                                            >
                                                {tratamiento.estado}
                                            </span>
                                        </td>

                                        <td style={styles.td}>
                                            <div style={styles.acciones}>
                                                {!esPaciente && (
                                                    <button
                                                        style={{
                                                            ...styles.actionButton,
                                                            backgroundColor: "#2f80ed"
                                                        }}
                                                        onClick={() =>
                                                            navigate(`/tratamientos/editar/${tratamiento.id_tratamiento}`)
                                                        }
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                )}

                                                <button
                                                    style={{
                                                        ...styles.actionButton,
                                                        backgroundColor: "#27ae60"
                                                    }}
                                                    onClick={() =>
                                                        navigate(
                                                            esPaciente
                                                                ? `/paciente/tratamientos/ver/${tratamiento.id_tratamiento}`
                                                                : `/tratamientos/ver/${tratamiento.id_tratamiento}`
                                                        )
                                                    }
                                                >
                                                    <FaEye />
                                                </button>

                                                {!esPaciente && tratamiento.estado === "ACTIVO" && (
                                                    <button
                                                        style={{
                                                            ...styles.actionButton,
                                                            backgroundColor: "#eb5757"
                                                        }}
                                                        onClick={() => confirmarCambioEstado(tratamiento)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                )}

                                                {!esPaciente && tratamiento.estado === "INACTIVO" && (
                                                    <button
                                                        style={{
                                                            ...styles.actionButton,
                                                            backgroundColor: "#f4bd4f",
                                                            color: "#08234d"
                                                        }}
                                                        onClick={() => confirmarCambioEstado(tratamiento)}
                                                    >
                                                        <FaRedo />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Tratamientos;