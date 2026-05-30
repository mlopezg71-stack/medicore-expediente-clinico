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
    FaEye,
    FaPlus,
    FaCheck,
    FaTimes
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import axiosClient from "../../api/axiosConfig";
import logo from "../../assets/logos/medicore-Copy.png";


const Citas = () => {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const esAdmin = usuario?.rol === "ADMIN";
    const esMedico = usuario?.rol === "MEDICO";
    const esPaciente = usuario?.rol === "PACIENTE";

    const [citas, setCitas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("TODOS");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        obtenerCitas();
    }, []);

    const obtenerCitas = async () => {
        try {
            const response = await axiosClient.get("/citas");
            setCitas(response.data);
        } catch (error) {
            console.error("Error al obtener citas:", error);
            setMensaje("Error al cargar citas médicas");
        }
    };

    const mostrarMensaje = (texto) => {
        setMensaje(texto);
        setTimeout(() => {
            setMensaje("");
        }, 3000);
    };

    const confirmarCita = async (id) => {
        try {
            await axiosClient.put(`/citas/${id}/confirmar`);
            mostrarMensaje("Cita confirmada correctamente");
            obtenerCitas();
        } catch (error) {
            mostrarMensaje(error.response?.data?.message || "Error al confirmar cita");
        }
    };

    const cancelarCita = async (id) => {
        const motivo = window.prompt("Ingrese el motivo de cancelación:");

        if (!motivo) return;

        try {
            await axiosClient.put(`/citas/${id}/cancelar`, {
                motivo_cancelacion: motivo
            });

            mostrarMensaje("Cita cancelada correctamente");
            obtenerCitas();
        } catch (error) {
            mostrarMensaje(error.response?.data?.message || "Error al cancelar cita");
        }
    };

    const atenderCita = async (id) => {
        try {
            await axiosClient.put(`/citas/${id}/atender`);
            mostrarMensaje("Cita marcada como atendida");
            obtenerCitas();
        } catch (error) {
            mostrarMensaje(error.response?.data?.message || "Error al atender cita");
        }
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return "N/A";

        return new Date(fecha).toLocaleString("es-GT", {
            dateStyle: "short",
            timeStyle: "short"
        });
    };

    const obtenerEstiloEstado = (estado) => {
        if (estado === "PENDIENTE") return styles.estadoPendiente;
        if (estado === "CONFIRMADA") return styles.estadoConfirmada;
        if (estado === "ATENDIDA") return styles.estadoAtendida;
        if (estado === "CANCELADA") return styles.estadoCancelada;

        return styles.estadoPendiente;
    };

    const citasFiltradas = citas.filter((cita) => {
        const paciente = `${cita.paciente?.nombres || ""} ${cita.paciente?.apellidos || ""}`;
        const medico = cita.usuario?.nombre_completo || "";
        const motivo = cita.motivo || "";
        const tipo = cita.tipo_cita || "";
        const estado = cita.estado || "";

        const coincideBusqueda =
            paciente.toLowerCase().includes(busqueda.toLowerCase()) ||
            medico.toLowerCase().includes(busqueda.toLowerCase()) ||
            motivo.toLowerCase().includes(busqueda.toLowerCase()) ||
            tipo.toLowerCase().includes(busqueda.toLowerCase());

        const coincideEstado =
            estadoFiltro === "TODOS" || estado === estadoFiltro;

        return coincideBusqueda && coincideEstado;
    });

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
        subtitle: {
            color: "#6b7890",
            marginTop: "6px",
            fontSize: "14px"
        },
        topActions: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            gap: "20px",
            flexWrap: "wrap"
        },
        filters: {
            display: "flex",
            gap: "14px",
            alignItems: "center",
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
        select: {
            height: "48px",
            border: "1px solid #dbe3ee",
            borderRadius: "10px",
            padding: "0 14px",
            color: "#102b5c",
            fontSize: "14px",
            outline: "none",
            backgroundColor: "#ffffff"
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
        estadoPendiente: {
            backgroundColor: "#fff4d6",
            color: "#8a5a00",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold"
        },
        estadoConfirmada: {
            backgroundColor: "#dbeafe",
            color: "#1e40af",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold"
        },
        estadoAtendida: {
            backgroundColor: "#dff6e4",
            color: "#1f7a3f",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold"
        },
        estadoCancelada: {
            backgroundColor: "#fde2e2",
            color: "#b42318",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold"
        },
        acciones: {
            display: "flex",
            gap: "10px",
            flexWrap: "wrap"
        },
        actionButton: {
            border: "none",
            borderRadius: "8px",
            width: "35px",
            height: "35px",
            cursor: "pointer",
            color: "#ffffff"
        },
        atenderButton: {
            border: "none",
            borderRadius: "8px",
            height: "35px",
            padding: "0 12px",
            cursor: "pointer",
            color: "#ffffff",
            backgroundColor: "#0b2c5f",
            fontWeight: "bold"
        },
        emptyRow: {
            padding: "25px",
            textAlign: "center",
            color: "#6b7890",
            fontSize: "15px"
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
                                        (esPaciente && modulo.ruta === "/paciente/citas") ||
                                            (!esPaciente && modulo.ruta === "/citas")
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

            <main style={styles.main}>
                <nav style={styles.navbar}>
                    <div>
                        <h1 style={styles.title}>
                            {esPaciente ? "Mis Citas Médicas" : "Citas Médicas"}
                        </h1>
                        <p style={styles.subtitle}>
                            {esPaciente
                                ? "Consulta y administra tus citas médicas programadas."
                                : "Gestión de agenda médica, pacientes y disponibilidad de doctores."
                            }
                        </p>
                    </div>
                </nav>

                <section style={styles.topActions}>
                    <div style={styles.filters}>
                        <div style={styles.searchBox}>
                            <FaSearch color="#6b7890" />

                            <input
                                type="text"
                                placeholder="Buscar cita, paciente, médico o motivo..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                style={styles.searchInput}
                            />
                        </div>

                        <select
                            value={estadoFiltro}
                            onChange={(e) => setEstadoFiltro(e.target.value)}
                            style={styles.select}
                        >
                            <option value="TODOS">Todos los estados</option>
                            <option value="PENDIENTE">Pendiente</option>
                            <option value="CONFIRMADA">Confirmada</option>
                            <option value="ATENDIDA">Atendida</option>
                            <option value="CANCELADA">Cancelada</option>
                        </select>
                    </div>

                    <button
                        style={styles.addButton}
                        onClick={() =>
                            navigate(
                                esPaciente
                                    ? "/paciente/citas/crear"
                                    : "/citas/crear"
                            )
                        }
                    >
                        <FaPlus />
                        Nueva Cita
                    </button>
                </section>

                <section style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Fecha y hora</th>
                                <th style={styles.th}>Paciente</th>
                                <th style={styles.th}>Médico</th>
                                <th style={styles.th}>Motivo</th>
                                <th style={styles.th}>Tipo</th>
                                <th style={styles.th}>Modalidad</th>
                                <th style={styles.th}>Estado</th>
                                <th style={styles.th}>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {citasFiltradas.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={styles.emptyRow}>
                                        No se encontraron citas médicas.
                                    </td>
                                </tr>
                            ) : (
                                citasFiltradas.map((cita) => (
                                    <tr key={cita.id_cita}>
                                        <td style={styles.td}>
                                            {formatearFecha(cita.fecha_hora)}
                                        </td>

                                        <td style={styles.td}>
                                            {cita.paciente
                                                ? `${cita.paciente.nombres} ${cita.paciente.apellidos}`
                                                : "Paciente no registrado"}
                                        </td>

                                        <td style={styles.td}>
                                            {cita.usuario?.nombre_completo || "Sin médico"}
                                        </td>

                                        <td style={styles.td}>
                                            {cita.motivo || "Sin motivo"}

                                            {cita.sintomas && (
                                                <div style={styles.smallText}>
                                                    Síntomas: {cita.sintomas}
                                                </div>
                                            )}
                                        </td>

                                        <td style={styles.td}>
                                            {cita.tipo_cita || "GENERAL"}
                                        </td>

                                        <td style={styles.td}>
                                            {cita.modalidad || "PRESENCIAL"}
                                        </td>

                                        <td style={styles.td}>
                                            <span style={obtenerEstiloEstado(cita.estado)}>
                                                {cita.estado}
                                            </span>
                                        </td>

                                        <td style={styles.td}>
                                            <div style={styles.acciones}>
                                                <button
                                                    style={{
                                                        ...styles.actionButton,
                                                        backgroundColor: "#27ae60"
                                                    }}
                                                    onClick={() =>
                                                        navigate(
                                                            esPaciente
                                                                ? `/paciente/citas/ver/${cita.id_cita}`
                                                                : `/citas/ver/${cita.id_cita}`
                                                        )
                                                    }
                                                >
                                                    <FaEye />
                                                </button>

                                                {!esPaciente && cita.estado === "PENDIENTE" && (
                                                    <button
                                                        style={{
                                                            ...styles.actionButton,
                                                            backgroundColor: "#2f80ed"
                                                        }}
                                                        onClick={() => confirmarCita(cita.id_cita)}
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                )}

                                                {!esPaciente &&
                                                    (cita.estado === "PENDIENTE" ||
                                                        cita.estado === "CONFIRMADA") && (
                                                        <button
                                                            style={{
                                                                ...styles.actionButton,
                                                                backgroundColor: "#eb5757"
                                                            }}
                                                            onClick={() => cancelarCita(cita.id_cita)}
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    )}

                                                {!esPaciente && cita.estado === "CONFIRMADA" && (
                                                    <button
                                                        style={styles.atenderButton}
                                                        onClick={() => atenderCita(cita.id_cita)}
                                                    >
                                                        Atender
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

export default Citas;