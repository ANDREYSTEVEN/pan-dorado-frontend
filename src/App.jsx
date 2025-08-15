import React from "react";
import {
  BrowserRouter as Router,      // ← BrowserRouter para URLs limpias
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

import {
  Cookie,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  DollarSign,
  Tag,
  Store,
  Truck,
  Eye,
  EyeOff,
  Plus,
  Save,
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Pencil,
  Trash2,
} from "lucide-react";

/** =========================================================
 *  Frontend "Panadería Pan Dorado" — listo para GitHub Pages
 *  - BrowserRouter + basename para URLs limpias
 *  - Assets con import.meta.env.BASE_URL
 *  - Login pro + Dashboard con módulos funcionales
 *  =======================================================*/

// Base para assets (funciona en Pages bajo /<repo>/)
const BASE = import.meta.env.BASE_URL || "/";

// ---- Utils localStorage ---------------------------------
const lsGet = (k, fallback = []) => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const lsSet = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// ---- Auth simulada --------------------------------------
const fakeAuth = {
  signIn: async (email, password) => {
    await new Promise((r) => setTimeout(r, 400));
    if (email && password && password.length >= 4) return { name: "Administrador", email };
    throw new Error("Credenciales inválidas");
  },
};

// ========================= Layout Admin ===================
function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const avatarSrc = React.useMemo(
    () => localStorage.getItem("adminAvatar") || `${BASE}avatar-admin.png`,
    []
  );

  // Menú avatar con cierre click-outside/ESC/scroll/route
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setMenuOpen(false);
    const onScroll = () => setMenuOpen(false);
    window.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onEsc);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onEsc);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, []);
  React.useEffect(() => setMenuOpen(false), [location.pathname]);

  const navItems = [
    { to: "/admin", label: "Resumen", icon: Cookie },
    { to: "/admin/productos", label: "Gestionar productos", icon: Package },
    { to: "/admin/pedidos", label: "Ver pedidos", icon: ShoppingCart },
    { to: "/admin/repartos", label: "Repartos", icon: Truck },
    { to: "/admin/ventas", label: "Ventas", icon: DollarSign },
    { to: "/admin/inventario", label: "Inventario", icon: Store },
    { to: "/admin/clientes", label: "Clientes", icon: Users },
    { to: "/admin/promociones", label: "Promociones", icon: Tag },
    { to: "/admin/reportes", label: "Reportes", icon: BarChart3 },
    { to: "/admin/ajustes", label: "Ajustes", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2 font-semibold text-amber-700">
            <img src={`${BASE}logo.png`} alt="Panadería Pan Dorado" className="h-6 w-6 rounded-sm" />
            <span>Panadería Pan Dorado</span>
          </Link>

          <div className="flex items-center gap-3">
            <Badge className="hidden sm:inline-flex">Admin</Badge>
            <div className="relative" ref={menuRef}>
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <Avatar className="h-9 w-9 ring-2 ring-amber-200 bg-amber-50">
                  <AvatarImage src={avatarSrc} alt="Administrador" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-amber-800">Administrador</span>
              </Button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-2xl border bg-white shadow-xl">
                  <div className="px-3 py-2 text-sm text-neutral-500">Mi cuenta</div>
                  <div className="h-px bg-neutral-100" />
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-amber-50 flex items-center"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/login");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 p-4 md:p-6">
        <aside className="bg-white/70 backdrop-blur rounded-2xl shadow-sm border">
          <nav className="p-3 space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-amber-50 text-amber-800"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main>
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="productos" element={<ProductsPage />} />
            <Route path="productos/nuevo" element={<ProductForm mode="create" />} />
            <Route path="productos/:id/editar" element={<ProductForm mode="edit" />} />
            <Route path="pedidos" element={<OrdersPage />} />
            <Route path="repartos" element={<DeliveriesList />} />
            <Route path="repartos/nuevo" element={<NewDelivery />} />
            <Route path="ventas" element={<SalesList />} />
            <Route path="ventas/nueva" element={<NewSale />} />
            <Route path="inventario" element={<InventoryPage />} />
            <Route path="clientes" element={<CustomersPage />} />
            <Route path="promociones" element={<PromosPage />} />
            <Route path="reportes" element={<ReportsPage />} />
            <Route path="ajustes" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ========================= Login =========================
export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Usa tu fakeAuth.signIn si existe; si no, el fallback
      const signIn =
        typeof fakeAuth !== "undefined" && typeof fakeAuth.signIn === "function"
          ? fakeAuth.signIn
          : __fallbackSignIn;

      await signIn(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  // atajos
  const BASE = import.meta.env.BASE_URL || "/";

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* VIDEO de fondo */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={`${BASE}panaderia-bg-poster.jpg`}     // <-- poster
      >
        {/* Si generas la versión webm, déjala arriba del mp4 */}
        {/* <source src={`${BASE}panaderia-bg.webm`} type="video/webm" /> */}
        <source src={`${BASE}panaderia-bg.mp4`} type="video/mp4" />
        {/* Último fallback a gif/imagen (opcional) */}
        {/* <img src={`${BASE}hero-login.gif`} alt="" className="h-full w-full object-cover" /> */}
      </video>

      {/* Capa de contraste sobre el video */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-amber-700/40 to-orange-600/35" />

      {/* Ruido/grano sutil para textura premium */}
      <svg className="absolute inset-0 opacity-[0.05] mix-blend-multiply pointer-events-none" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Contenido: card centrado */}
      <div className="relative z-10 grid min-h-screen place-items-center p-6 md:p-10">
        <div className="w-full max-w-2xl">
          <Card
            className={`w-full max-w-lg mx-auto rounded-2xl border-amber-100/80 shadow-2xl backdrop-blur-[2px] ${
              error ? "animate-shake" : ""
            }`}
          >
            <CardHeader className="px-8 pt-8 pb-4 text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-amber-100 flex items-center justify-center shadow">
                <img src={`${BASE}logo.png`} alt="logo" className="h-7 w-7" />
              </div>
              <CardTitle className="mt-3 text-2xl text-white">Inicia sesión</CardTitle>
              <p className="text-sm text-white/80">Accede al panel de administración</p>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Correo (floating label + micro animación) */}
                <div className="grid gap-2">
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder=" " /* necesario para floating label */
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="peer h-11 w-full rounded-xl border border-amber-200 bg-white/95 px-3 text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus-glow"
                    />
                    <label
                      htmlFor="email"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 origin-left text-[14px] text-neutral-500 transition-all duration-200
                                 peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-amber-700 peer-placeholder-shown:translate-y-1/2
                                 peer-placeholder-shown:scale-100 peer-[&:not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:placeholder-shown)]:scale-90
                                 peer-focus:animate-jump"
                    >
                      Correo
                    </label>
                  </div>
                </div>

                {/* Contraseña (floating + toggle mostrar/ocultar) */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-transparent select-none">.</span>
                    <button
                      type="button"
                      className="text-xs text-amber-100 hover:underline"
                      onClick={() => alert("Implementa tu recuperación de contraseña")}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPass ? "text" : "password"}
                      placeholder=" "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="peer h-11 w-full rounded-xl border border-amber-200 bg-white/95 px-3 pr-9 text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus-glow"
                    />
                    <label
                      htmlFor="password"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 origin-left text-[14px] text-neutral-500 transition-all duration-200
                                 peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-amber-700 peer-placeholder-shown:translate-y-1/2
                                 peer-placeholder-shown:scale-100 peer-[&:not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:placeholder-shown)]:scale-90
                                 peer-focus:animate-jump"
                    >
                      Contraseña
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute inset-y-0 right-2 flex items-center px-2 text-neutral-500 hover:text-amber-200"
                      aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  <label className="mt-1 flex items-center gap-2 text-sm text-amber-50/90">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-amber-200 text-amber-600"
                    />
                    Recordarme en este equipo
                  </label>
                </div>

                {/* Error */}
                {error && <p className="text-sm text-red-200">{error}</p>}

                {/* Botón */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 text-[15px] hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? "Ingresando..." : "Entrar"}
                </Button>

                <div className="pt-1 text-xs text-amber-100/80 text-center">
                  Al continuar aceptas nuestras{" "}
                  <a className="underline hover:text-amber-200" href="#">
                    Condiciones
                  </a>{" "}
                  y{" "}
                  <a className="underline hover:text-amber-200" href="#">
                    Privacidad
                  </a>
                  .
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Footer marca */}
        <div className="absolute bottom-4 left-0 right-0 mx-auto text-center text-xs text-amber-100">
          © {new Date().getFullYear()} Panadería Pan Dorado — Todos los derechos reservados
        </div>
      </div>
    </div>
  );
}

// ========================= Dashboard (home) ========================
function StatCard({ title, value, icon: Icon, hint }) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">{title}</p>
          <p className="text-2xl font-semibold text-amber-800">{value}</p>
          {hint && <p className="text-xs text-neutral-500 mt-1">{hint}</p>}
        </div>
        {Icon && <Icon className="h-8 w-8 text-amber-600" />}
      </CardContent>
    </Card>
  );
}

function DashboardHome() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-800">Resumen</h2>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/admin/repartos/nuevo")}>
            <Truck className="mr-2 h-4 w-4" />
            Programar reparto
          </Button>
          <Button variant="outline" onClick={() => navigate("/admin/ventas/nueva")}>
            <DollarSign className="mr-2 h-4 w-4" />
            Registrar venta
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Ventas de hoy" value="$ 1,250" icon={DollarSign} hint="+8% vs ayer" />
        <StatCard title="Pedidos en curso" value="23" icon={ShoppingCart} hint="4 para entregar" />
        <StatCard title="Productos activos" value="58" icon={Package} />
        <StatCard title="Clientes nuevos" value="12" icon={Users} />
      </div>
    </div>
  );
}

// ========================= Productos (CRUD) ========================
function ensureProducts() {
  let rows = lsGet("productos");
  if (!rows || rows.length === 0) {
    rows = [
      { id: 1, nombre: "Baguette", cat: "Pan salado", precio: 1.5, stock: 120 },
      { id: 2, nombre: "Concha", cat: "Pan dulce", precio: 0.9, stock: 200 },
      { id: 3, nombre: "Croissant", cat: "Hojaldre", precio: 1.8, stock: 45 },
    ];
    lsSet("productos", rows);
  }
  return rows;
}

function ProductsPage() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState(() => ensureProducts());
  const refresh = () => setRows(lsGet("productos"));

  const remove = (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    const next = rows.filter((r) => r.id !== id);
    lsSet("productos", next);
    setRows(next);
  };

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-800">Gestionar productos</h2>
        <Button onClick={() => navigate("/admin/productos/nuevo")}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo producto
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-amber-50">
              <tr>
                <th className="text-left p-3">Producto</th>
                <th className="text-left p-3">Categoría</th>
                <th className="text-left p-3">Precio</th>
                <th className="text-left p-3">Stock</th>
                <th className="text-right p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="p-3">{row.nombre}</td>
                  <td className="p-3">{row.cat}</td>
                  <td className="p-3">${Number(row.precio).toFixed(2)}</td>
                  <td className="p-3">{row.stock}</td>
                  <td className="p-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/productos/${row.id}/editar`)}
                    >
                      <Pencil className="h-4 w-4 mr-1" /> Editar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => remove(row.id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="p-6 text-neutral-500" colSpan={5}>
                    No hay productos. Crea el primero.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function ProductForm({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = mode === "edit";
  const all = React.useMemo(() => ensureProducts(), []);
  const current = editing ? all.find((p) => String(p.id) === id) : null;

  const [form, setForm] = React.useState(
    current || { nombre: "", cat: "Pan salado", precio: 0, stock: 0 }
  );

  React.useEffect(() => {
    if (editing && !current) navigate("/admin/productos");
  }, [editing, current, navigate]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const rows = lsGet("productos");
    if (editing) {
      const next = rows.map((r) =>
        r.id === current.id ? { ...current, ...form, precio: +form.precio, stock: +form.stock } : r
      );
      lsSet("productos", next);
    } else {
      const newItem = {
        id: Date.now(),
        nombre: form.nombre,
        cat: form.cat,
        precio: +form.precio,
        stock: +form.stock,
      };
      rows.push(newItem);
      lsSet("productos", rows);
    }
    navigate("/admin/productos");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
        <h2 className="text-2xl font-bold text-amber-800">
          {editing ? "Editar producto" : "Nuevo producto"}
        </h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2 md:col-span-2">
              <Label>Nombre</Label>
              <Input name="nombre" value={form.nombre} onChange={onChange} placeholder="Ej. Concha de vainilla" required />
            </div>

            <div className="grid gap-2">
              <Label>Categoría</Label>
              <select
                name="cat"
                value={form.cat}
                onChange={onChange}
                className="h-11 rounded-md border px-3 text-sm bg-white"
              >
                <option>Pan salado</option>
                <option>Pan dulce</option>
                <option>Hojaldre</option>
                <option>Integral</option>
                <option>Otro</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label>Precio</Label>
              <Input name="precio" type="number" step="0.01" min="0" value={form.precio} onChange={onChange} />
            </div>

            <div className="grid gap-2">
              <Label>Stock</Label>
              <Input name="stock" type="number" min="0" value={form.stock} onChange={onChange} />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => navigate("/admin/productos")}>
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" /> Guardar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ========================= Pedidos (demo estático) ==================
function OrdersPage() {
  const rows = [
    { id: 1012, cliente: "Café La Plaza", estado: "Preparando", total: 52.1, fecha: "12/08/2025" },
    { id: 1013, cliente: "Hotel Sol", estado: "En reparto", total: 134.9, fecha: "12/08/2025" },
    { id: 1014, cliente: "Público", estado: "Entregado", total: 12.5, fecha: "11/08/2025" },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-800">Pedidos</h2>
        <div className="flex gap-2">
          <Button variant="outline">Exportar</Button>
          <Button>Crear pedido</Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-amber-50">
              <tr>
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">Cliente</th>
                <th className="text-left p-3">Estado</th>
                <th className="text-left p-3">Total</th>
                <th className="text-right p-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="p-3">{row.id}</td>
                  <td className="p-3">{row.cliente}</td>
                  <td className="p-3"><Badge className="bg-amber-100 text-amber-700">{row.estado}</Badge></td>
                  <td className="p-3">${row.total.toFixed(2)}</td>
                  <td className="p-3 text-right">{row.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

// ========================= Repartos (funcional) ====================
function DeliveriesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = React.useState(() => lsGet("repartos"));
  React.useEffect(() => setRows(lsGet("repartos")), [location.key]);

  const remove = (id) => {
    const next = rows.filter((r) => r.id !== id);
    setRows(next);
    lsSet("repartos", next);
  };

  const ok = new URLSearchParams(location.search).get("ok");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-800">Repartos</h2>
        <Button onClick={() => navigate("/admin/repartos/nuevo")}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo reparto
        </Button>
      </div>

      {ok && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
          Reparto programado correctamente.
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-amber-50">
              <tr>
                <th className="text-left p-3">Cliente</th>
                <th className="text-left p-3">Teléfono</th>
                <th className="text-left p-3">Dirección</th>
                <th className="text-left p-3">Fecha</th>
                <th className="text-left p-3">Hora</th>
                <th className="text-left p-3">Obs.</th>
                <th className="text-right p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td className="p-6 text-neutral-500" colSpan={7}>
                    No tienes repartos programados.
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="p-3">{r.cliente}</td>
                  <td className="p-3">{r.telefono}</td>
                  <td className="p-3">{r.direccion}</td>
                  <td className="p-3">{r.fecha}</td>
                  <td className="p-3">{r.hora}</td>
                  <td className="p-3">{r.obs || "-"}</td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => remove(r.id)}>
                      Marcar entregado
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function NewDelivery() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    cliente: "",
    telefono: "",
    direccion: "",
    fecha: "",
    hora: "",
    obs: "",
  });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const rows = lsGet("repartos");
    rows.push({ id: Date.now(), ...form });
    lsSet("repartos", rows);
    navigate("/admin/repartos?ok=1");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
        <h2 className="text-2xl font-bold text-amber-800">Programar reparto</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Cliente</Label>
              <div className="relative">
                <Input name="cliente" value={form.cliente} onChange={onChange} placeholder="Nombre del cliente" required />
                <User className="h-4 w-4 absolute right-3 top-3 text-neutral-400" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Teléfono</Label>
              <div className="relative">
                <Input name="telefono" value={form.telefono} onChange={onChange} placeholder="(xxx) xxx-xxxx" />
                <Phone className="h-4 w-4 absolute right-3 top-3 text-neutral-400" />
              </div>
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label>Dirección</Label>
              <div className="relative">
                <Input name="direccion" value={form.direccion} onChange={onChange} placeholder="Calle, número, ciudad" required />
                <MapPin className="h-4 w-4 absolute right-3 top-3 text-neutral-400" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Fecha</Label>
              <Input type="date" name="fecha" value={form.fecha} onChange={onChange} required />
            </div>
            <div className="grid gap-2">
              <Label>Hora</Label>
              <Input type="time" name="hora" value={form.hora} onChange={onChange} required />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label>Observaciones</Label>
              <input
                name="obs"
                value={form.obs}
                onChange={onChange}
                placeholder="Comentarios para el repartidor"
                className="h-11 w-full rounded-md border px-3 text-sm"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => navigate("/admin/repartos")}>
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" /> Guardar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ========================= Ventas (funcional + demo) ===============
function SalesList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [rows, setRows] = React.useState(() => lsGet("ventas"));
  React.useEffect(() => {
    setRows(lsGet("ventas"));
  }, [location.key]);

  const demo = [
    { id: 9001, cliente: "Mostrador", pago: "Efectivo", total: 25.5, fecha: "12/08/2025" },
    { id: 9002, cliente: "Café La Plaza", pago: "Transferencia", total: 180.0, fecha: "12/08/2025" },
    { id: 9003, cliente: "Hotel Sol", pago: "Tarjeta", total: 342.9, fecha: "11/08/2025" },
  ];

  const ok = new URLSearchParams(location.search).get("ok");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-800">Ventas</h2>
        <Button onClick={() => navigate("/admin/ventas/nueva")}>
          <Plus className="mr-2 h-4 w-4" /> Registrar venta
        </Button>
      </div>

      {ok && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
          Venta registrada correctamente.
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Ventas guardadas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-amber-50">
              <tr>
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">Cliente</th>
                <th className="text-left p-3">Pago</th>
                <th className="text-left p-3">Total</th>
                <th className="text-right p-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td className="p-6 text-neutral-500" colSpan={5}>
                    Aún no has registrado ventas.
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="p-3">{r.id}</td>
                  <td className="p-3">{r.cliente || "-"}</td>
                  <td className="p-3">{r.pago}</td>
                  <td className="p-3">${r.total.toFixed(2)}</td>
                  <td className="p-3 text-right">{r.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ejemplos (demo)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-amber-50">
              <tr>
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">Cliente</th>
                <th className="text-left p-3">Pago</th>
                <th className="text-left p-3">Total</th>
                <th className="text-right p-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {demo.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="p-3">{r.id}</td>
                  <td className="p-3">{r.cliente}</td>
                  <td className="p-3">{r.pago}</td>
                  <td className="p-3">${r.total.toFixed(2)}</td>
                  <td className="p-3 text-right">{r.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function NewSale() {
  const navigate = useNavigate();
  const [cliente, setCliente] = React.useState("");
  const [pago, setPago] = React.useState("Efectivo");
  const [items, setItems] = React.useState([{ producto: "", cantidad: 1, precio: 0 }]);

  const addItem = () => setItems((arr) => [...arr, { producto: "", cantidad: 1, precio: 0 }]);
  const updateItem = (i, field, value) =>
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  const removeItem = (i) => setItems((arr) => arr.filter((_, idx) => idx !== i));

  const total = items.reduce((acc, it) => acc + (Number(it.cantidad) || 0) * (Number(it.precio) || 0), 0);

  const onSubmit = (e) => {
    e.preventDefault();
    const ventas = lsGet("ventas");
    ventas.push({
      id: Date.now(),
      cliente,
      pago,
      items,
      total,
      fecha: new Date().toLocaleDateString(),
    });
    lsSet("ventas", ventas);
    navigate("/admin/ventas?ok=1");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
        <h2 className="text-2xl font-bold text-amber-800">Registrar venta</h2>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Cliente (opcional)</Label>
                <Input value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Mostrador / Nombre" />
              </div>
              <div className="grid gap-2">
                <Label>Pago</Label>
                <select
                  value={pago}
                  onChange={(e) => setPago(e.target.value)}
                  className="h-11 rounded-md border px-3 text-sm bg-white"
                >
                  <option>Efectivo</option>
                  <option>Tarjeta</option>
                  <option>Transferencia</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label>Fecha</Label>
                <Input disabled value={new Date().toLocaleDateString()} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-amber-800">Productos</h3>
                <Button type="button" variant="outline" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" /> Agregar ítem
                </Button>
              </div>

              <div className="rounded-xl border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="text-left p-3">Producto</th>
                      <th className="text-left p-3">Cantidad</th>
                      <th className="text-left p-3">Precio</th>
                      <th className="text-right p-3">Total</th>
                      <th className="text-right p-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, i) => {
                      const rowTotal = (Number(it.cantidad) || 0) * (Number(it.precio) || 0);
                      return (
                        <tr key={i} className="border-t">
                          <td className="p-2">
                            <Input
                              value={it.producto}
                              onChange={(e) => updateItem(i, "producto", e.target.value)}
                              placeholder="Croissant, Concha..."
                            />
                          </td>
                          <td className="p-2 w-32">
                            <Input
                              type="number"
                              min={1}
                              value={it.cantidad}
                              onChange={(e) => updateItem(i, "cantidad", e.target.value)}
                            />
                          </td>
                          <td className="p-2 w-40">
                            <Input
                              type="number"
                              step="0.01"
                              min={0}
                              value={it.precio}
                              onChange={(e) => updateItem(i, "precio", e.target.value)}
                            />
                          </td>
                          <td className="p-2 text-right w-32">${rowTotal.toFixed(2)}</td>
                          <td className="p-2 text-right w-40">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(i)}
                              disabled={items.length === 1}
                            >
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end text-lg font-semibold text-amber-800">
                Total: <span className="ml-2">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => navigate("/admin/ventas")}>
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" /> Guardar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ========================= Inventario ==============================
function InventoryPage() {
  const insumos = [
    { k: "Harina", u: "kg", n: 120, max: 200 },
    { k: "Levadura", u: "kg", n: 8, max: 20 },
    { k: "Mantequilla", u: "kg", n: 22, max: 40 },
    { k: "Azúcar", u: "kg", n: 40, max: 60 },
    { k: "Huevos", u: "pzas", n: 300, max: 500 },
    { k: "Sal", u: "kg", n: 10, max: 20 },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-800">Inventario</h2>
      <Card>
        <CardContent className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {insumos.map((i, idx) => {
            const pct = Math.min(100, Math.round((i.n / i.max) * 100));
            return (
              <div key={idx} className="rounded-xl border p-4">
                <p className="text-sm text-neutral-500">{i.k}</p>
                <p className="text-xl font-semibold text-amber-800">
                  {i.n} {i.u} <span className="text-sm text-neutral-500">/ {i.max} {i.u}</span>
                </p>
                <div className="mt-2 h-2 bg-amber-100 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${pct < 30 ? "bg-red-400" : pct < 60 ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">{pct}% de stock</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

// ========================= Clientes / Promos (demo) ================
function CustomersPage() {
  const rows = [
    { n: "Café La Plaza", e: "compras@cafelaplaza.com", c: 23, u: "Ayer" },
    { n: "Hotel Sol", e: "eventos@hotelsol.com", c: 12, u: "2 días" },
    { n: "Público", e: "-", c: 213, u: "Hoy" },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-800">Clientes</h2>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-amber-50">
              <tr>
                <th className="text-left p-3">Nombre</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Compras</th>
                <th className="text-right p-3">Última compra</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3">{row.n}</td>
                  <td className="p-3">{row.e}</td>
                  <td className="p-3">{row.c}</td>
                  <td className="p-3 text-right">{row.u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function PromosPage() {
  const promos = [
    { t: "2x1 en conchas", d: "Solo martes" },
    { t: "-15% croissant", d: "Fin de semana" },
    { t: "Combo desayuno", d: "Café + pieza" },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-800">Promociones</h2>
      <Card>
        <CardContent className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {promos.map((p, i) => (
            <div key={i} className="rounded-xl border p-4">
              <p className="font-medium">{p.t}</p>
              <p className="text-sm text-neutral-500">{p.d}</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">Editar</Button>
                <Button size="sm">Activar</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ========================= Reportes ================================
function ReportsPage() {
  const data = [
    { label: "Lun", value: 120 },
    { label: "Mar", value: 150 },
    { label: "Mié", value: 90 },
    { label: "Jue", value: 170 },
    { label: "Vie", value: 210 },
    { label: "Sáb", value: 280 },
    { label: "Dom", value: 160 },
  ];
  const max = Math.max(...data.map((d) => d.value));
  const scale = (v) => `${Math.round((v / max) * 220)}px`;

  const top = [
    { name: "Concha", ventas: 320 },
    { name: "Croissant", ventas: 280 },
    { name: "Baguette", ventas: 240 },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-amber-800">Reportes</h2>

      <Card>
        <CardHeader>
          <CardTitle>Ventas semanales (demo)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] px-4 flex items-end gap-5">
            {data.map((d) => (
              <div key={d.label} className="flex flex-col items-center gap-2">
                <div
                  className="w-[36px] rounded-xl bg-amber-500/85 shadow-sm"
                  style={{ height: scale(d.value) }}
                  title={`${d.label}: $${d.value}`}
                />
                <span className="text-xs text-neutral-600">{d.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-500 mt-3">Altura relativa al día con mayor venta.</p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top productos (demo)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {top.map((t, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-sm">
                    {i + 1}
                  </span>
                  <span>{t.name}</span>
                </div>
                <Badge className="bg-amber-50 text-amber-800 border border-amber-200">{t.ventas} u.</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6 p-6">
            <div className="rounded-xl border p-5">
              <p className="text-sm text-neutral-500">Ticket promedio</p>
              <p className="text-3xl font-semibold text-amber-800 mt-1">$ 8.40</p>
            </div>
            <div className="rounded-xl border p-5">
              <p className="text-sm text-neutral-500">Margen estimado</p>
              <p className="text-3xl font-semibold text-emerald-700 mt-1">36%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ========================= Ajustes ================================
function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-800">Ajustes</h2>
      <Card>
        <CardContent className="p-6 grid sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Nombre de la panadería</Label>
            <Input defaultValue="Panadería Pan Dorado" />
          </div>
          <div className="grid gap-2">
            <Label>Dirección</Label>
            <Input placeholder="Calle y número" />
          </div>
          <div className="grid gap-2">
            <Label>Teléfono</Label>
            <Input placeholder="(xxx) xxx-xxxx" />
          </div>
          <div className="grid gap-2">
            <Label>Horario</Label>
            <Input placeholder="Lun-Dom 6:00-20:00" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ========================= App (rutas) =========================
export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}> {/* ← IMPORTANTE: basename para subruta /<repo>/ */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="*" element={<div className="p-10 text-center">Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}
