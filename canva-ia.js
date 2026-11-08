(function () {
  "use strict";

  let currentGraphicSVG = "";
  let currentGraphicConfig = null;

  // 80 Plantillas 100% Vectoriales (20 Logotipos + 20 Banners + 20 Posts Redes + 20 Publicidad)
  const GRAPHIC_PRESETS = {
    "⭐ Plantillas de Logotipos de Marca (20 Diseños)": [
      { type: "logo", label: "Logo Cafetería", brand: "AROMA & GRANO", sub: "CAFÉ DE ESPECIALIDAD · EST. 2026", icon: "☕", shape: "circle", accent: "#d97706", dark: true, prompt: "Logotipo elegante para cafetería llamada 'Aroma & Grano' con emblema de taza y estilo artesanal" },
      { isPremium: true, type: "logo", label: "Logo Restaurante VIP", brand: "LA MAISON", sub: "ALTA COCINA & BISTRO", icon: "🍽️", shape: "diamond", accent: "#cdaa7d", dark: true, prompt: "Logotipo gourmet para restaurante llamado 'La Maison' en dorado y negro" },
      { type: "logo", label: "Logo Pizzería", brand: "LA VERA PIZZA", sub: "HORNO DE PIEDRA & LEÑA", icon: "🍕", shape: "shield", accent: "#ea580c", dark: false, prompt: "Logotipo para pizzería artesanal llamada 'La Vera Pizza' con emblema clásico" },
      { isPremium: true, type: "logo", label: "Logo Sushi Bar VIP", brand: "KURO ZEN", sub: "OMAKASE & SUSHI BAR", icon: "🍣", shape: "circle", accent: "#ef4444", dark: true, prompt: "Logotipo minimalista japonés para restaurante de sushi llamado 'Kuro Zen'" },
      { type: "logo", label: "Logo Taquería", brand: "EL DORADO", sub: "TAQUERÍA & PARRILLA MEXICANA", icon: "🌮", shape: "hex", accent: "#f59e0b", dark: true, prompt: "Logotipo mexicano moderno para taquería llamada 'El Dorado'" },
      { isPremium: true, type: "logo", label: "Logo Pastelería Fina", brand: "DULCE ARTE", sub: "REPOSTERÍA FINA & PASTELES", icon: "🧁", shape: "circle", accent: "#ec4899", dark: false, prompt: "Logotipo delicado para pastelería creativa llamada 'Dulce Arte'" },
      { type: "logo", label: "Logo Gimnasio", brand: "POWER FIT", sub: "TRAINING & FITNESS CENTER", icon: "💪", shape: "hex", accent: "#22c55e", dark: true, prompt: "Logotipo deportivo de alto impacto para gimnasio llamado 'Power Fit'" },
      { isPremium: true, type: "logo", label: "Logo Clínica Dental VIP", brand: "SONRISA PERFECTA", sub: "ESPECIALIDADES ODONTOLÓGICAS", icon: "🦷", shape: "circle", accent: "#0ea5e9", dark: false, prompt: "Logotipo médico limpio para clínica dental llamada 'Sonrisa Perfecta'" },
      { type: "logo", label: "Logo Barbería", brand: "GENTLEMAN CLUB", sub: "BARBER SHOP & GROOMING", icon: "💈", shape: "shield", accent: "#d97706", dark: true, prompt: "Logotipo vintage para barbería clásica llamada 'Gentleman Club'" },
      { isPremium: true, type: "logo", label: "Logo Boutique Alta Costura", brand: "AURA LUXE", sub: "FASHION & CONCEPT STORE", icon: "👗", shape: "diamond", accent: "#db2777", dark: false, prompt: "Logotipo de moda para boutique llamada 'Aura Luxe'" },
      { type: "logo", label: "Logo Joyería", brand: "DIAMANTE REAL", sub: "ALTA JOYERÍA & RELOJERÍA", icon: "💎", shape: "diamond", accent: "#d4af37", dark: true, prompt: "Logotipo de lujo para joyería llamada 'Diamante Real'" },
      { isPremium: true, type: "logo", label: "Logo Abogados VIP", brand: "JUSTICIA & LEY", sub: "FIRMA JURÍDICA CORPORATIVA", icon: "⚖️", shape: "shield", accent: "#b45309", dark: true, prompt: "Logotipo institucional para despacho de abogados llamado 'Justicia & Ley'" },
      { type: "logo", label: "Logo Contadores", brand: "TAX PRO", sub: "CONSULTORÍA FISCAL & CONTABLE", icon: "📊", shape: "hex", accent: "#059669", dark: false, prompt: "Logotipo corporativo para despacho contable llamado 'Tax Pro'" },
      { isPremium: true, type: "logo", label: "Logo Inmobiliaria VIP", brand: "CASA IDEAL", sub: "BIENES RAÍCES & ARQUITECTURA", icon: "🏠", shape: "hex", accent: "#2563eb", dark: false, prompt: "Logotipo moderno para inmobiliaria llamada 'Casa Ideal'" },
      { type: "logo", label: "Logo Veterinaria", brand: "HUELLITAS VET", sub: "CLÍNICA & ESTÉTICA DE MASCOTAS", icon: "🐾", shape: "circle", accent: "#06b6d4", dark: false, prompt: "Logotipo amigable para clínica veterinaria llamada 'Huellitas Vet'" },
      { isPremium: true, type: "logo", label: "Logo Taller Mecánico Pro", brand: "AUTOCARE PRO", sub: "SERVICIO AUTOMOTRIZ INTEGRAL", icon: "🔧", shape: "hex", accent: "#ef4444", dark: true, prompt: "Logotipo industrial para taller mecánico llamado 'AutoCare Pro'" },
      { type: "logo", label: "Logo Agencia Tech", brand: "DMD", sub: "DISEÑO WEB, IA & PUBLICIDAD", icon: "✨", shape: "hex", accent: "#2563eb", dark: true, prompt: "Logotipo tecnológico para agencia llamada 'DMD'" },
      { isPremium: true, type: "logo", label: "Logo Ciberseguridad VIP", brand: "IRONWALL SEC", sub: "CYBERSECURITY & CLOUD DEFENSE", icon: "🛡️", shape: "shield", accent: "#10b981", dark: true, prompt: "Logotipo tecnológico para empresa de ciberseguridad llamada 'IronWall'" },
      { type: "logo", label: "Logo Spa & Belleza", brand: "ZENITH SPA", sub: "BIENESTAR, MASAJES & FACIALES", icon: "🌿", shape: "circle", accent: "#14b8a6", dark: false, prompt: "Logotipo relajante para spa llamado 'Zenith Spa'" },
      { isPremium: true, type: "logo", label: "Logo Academia Master", brand: "EDUMASTER", sub: "ACADEMIA & CURSOS CERTIFICADOS", icon: "🎓", shape: "shield", accent: "#4f46e5", dark: false, prompt: "Logotipo educativo para academia llamada 'EduMaster'" }
    ],
    "🏷️ Plantillas de Banners Publicitarios (20 Diseños)": [
      { type: "banner", label: "Banner Cafetería 2x1", brand: "AROMA & GRANO", title: "2x1 EN FRAPPÉS Y LATTES", sub: "Todos los martes y jueves de 4:00 PM a 8:00 PM · Grano 100% Mexicano", cta: "PEDIR POR WHATSAPP", badge: "PROMO DE TEMPORADA", icon: "☕", accent: "#d97706", dark: true, prompt: "Banner publicitario para cafetería 'Aroma & Grano' con promoción 2x1 en frappés y lattes" },
      { isPremium: true, type: "banner", label: "Banner Pizzería VIP", brand: "LA VERA PIZZA", title: "2 PIZZAS GRANDES × $249 MXN", sub: "Masa madre horneada a la piedra + Refresco de 2L Gratis en envío a domicilio", cta: "ORDENAR AHORA →", badge: "ENVÍO GRATIS HOY", icon: "🍕", accent: "#ea580c", dark: true, prompt: "Banner promocional para pizzería 'La Vera Pizza' con paquete de 2 pizzas grandes por $249 MXN" },
      { type: "banner", label: "Banner Taquería", brand: "TACOS EL DORADO", title: "BUFFET DE TACOS $129 MXN", sub: "Pastor, Suadero, Arrachera y Chorizo con aguas frescas artesanales", cta: "RESERVAR MESA", badge: "VIERNES Y SÁBADO", icon: "🌮", accent: "#f59e0b", dark: true, prompt: "Banner publicitario para taquería 'Tacos El Dorado' con promoción de buffet de tacos" },
      { isPremium: true, type: "banner", label: "Banner Hamburguesas VIP", brand: "MONSTER BURGER", title: "COMBO SMASH DOBLE $149", sub: "Doble carne Angus, queso cheddar fundido, papas trufadas y bebida", cta: "PEDIR COMBO →", badge: "NUEVA RECETA", icon: "🍔", accent: "#ef4444", dark: true, prompt: "Banner publicitario para hamburguesería 'Monster Burger' con combo smash doble por $149" },
      { type: "banner", label: "Banner Sushi", brand: "KURO ZEN SUSHI", title: "3×2 EN TODOS LOS ROLLOS", sub: "Especialidades empanizadas, naturales y horneadas · Servicio en comedor y domicilio", cta: "VER MENÚ DIGITAL", badge: "JUEVES DE SUSHI", icon: "🍣", accent: "#e11d48", dark: true, prompt: "Banner publicitario para restaurante de sushi 'Kuro Zen' con 3x2 en todos los rollos" },
      { isPremium: true, type: "banner", label: "Banner Gimnasio VIP", brand: "POWER FIT CENTER", title: "INSCRIPCIÓN GRATIS + MES $349", sub: "Pesas, Cardio, Box Funcional y Asesoría Nutricional para estudiantes y público general", cta: "ACTIVAR PASE GRATIS", badge: "PROMO ESTUDIANTES", icon: "💪", accent: "#22c55e", dark: true, prompt: "Banner publicitario para gimnasio 'Power Fit' con inscripción gratis y mensualidad en $349" },
      { type: "banner", label: "Banner Clínica Dental", brand: "SONRISA PERFECTA", title: "LIMPIEZA ULTRASÓNICA $299 MXN", sub: "Incluye valoración con cámara intraoral, retiro de sarro y pulido dental", cta: "AGENDAR CITA HOY", badge: "SALUD DENTAL", icon: "🦷", accent: "#0ea5e9", dark: false, prompt: "Banner promocional para clínica dental 'Sonrisa Perfecta' con limpieza ultrasónica en $299" },
      { isPremium: true, type: "banner", label: "Banner Boutique Rebajas VIP", brand: "AURA LUXE BOUTIQUE", title: "HASTA 40% DE DESCUENTO", sub: "Nueva colección Primavera-Verano · Vestidos, conjuntos y calzado seleccionado", cta: "VER CATÁLOGO →", badge: "VENTA ESPECIAL", icon: "🛍️", accent: "#db2777", dark: false, prompt: "Banner de rebajas para boutique 'Aura Luxe' con hasta 40% de descuento en nueva colección" },
      { type: "banner", label: "Banner Paquete PyME DMD", brand: "DMD", title: "PAQUETE PYME WEB + LOGO $1,099", sub: "Página Web en GitHub Pages + Logotipo Vectorial + 500 Tarjetas Couché 300g", cta: "COTIZAR PROYECTO", badge: "ESPECIAL JOCOTITLÁN", icon: "🚀", accent: "#2563eb", dark: true, prompt: "Banner corporativo para 'DMD' anunciando el Paquete PyME de $1,099 MXN" },
      { isPremium: true, type: "banner", label: "Banner Tarjetas $150 VIP", brand: "IMPRENTA & DISEÑO DMD", title: "500 TARJETAS PRESENTACIÓN $150", sub: "Papel couché 300g con barniz UV brillante y código QR a tu WhatsApp", cta: "PEDIR MIS TARJETAS", badge: "PRECIO UNIVERSITARIO", icon: "💳", accent: "#4f46e5", dark: false, prompt: "Banner promocional de 500 tarjetas de presentación por $150 MXN con código QR" },
      { type: "banner", label: "Banner Barbería", brand: "GENTLEMAN BARBER", title: "CORTE + BARBA VIP × $220 MXN", sub: "Incluye ritual de toalla caliente, mascarilla negra de carbón activado y bebida", cta: "RESERVAR TURNO", badge: "ESTILO CLÁSICO", icon: "💈", accent: "#d97706", dark: true, prompt: "Banner publicitario para barbería 'Gentleman Barber' con paquete de corte y barba por $220" },
      { isPremium: true, type: "banner", label: "Banner Spa & Masajes VIP", brand: "ZENITH WELLNESS SPA", title: "DÍA DE SPA PARA DOS × $790", sub: "Masaje relajante de cuerpo completo + Facial hidratante + Aromaterapia", cta: "REGALAR EXPERIENCIA", badge: "PROMO PAREJAS", icon: "🌿", accent: "#14b8a6", dark: false, prompt: "Banner promocional para spa 'Zenith' con paquete para dos personas por $790" },
      { type: "banner", label: "Banner Veterinaria", brand: "HUELLITAS VETERINARIA", title: "CAMPAÑA DE VACUNACIÓN Y BAÑO", sub: "Consulta médica + Desparasitación + Estética canina completa desde $280 MXN", cta: "AGENDAR CITA VET", badge: "CUIDADO ANIMAL", icon: "🐾", accent: "#06b6d4", dark: false, prompt: "Banner promocional para veterinaria 'Huellitas' con campaña de vacunación y baño" },
      { isPremium: true, type: "banner", label: "Banner Taller Mecánico Pro", brand: "AUTOCARE PRO", title: "AFINACIÓN MAYOR DESDE $790", sub: "Cambio de aceite sintético, filtros, bujías, lavado de inyectores y escáner gratis", cta: "COTIZAR MI AUTO", badge: "GARANTÍA POR ESCRITO", icon: "🚗", accent: "#ef4444", dark: true, prompt: "Banner promocional para taller mecánico 'AutoCare Pro' con afinación mayor desde $790" },
      { type: "banner", label: "Banner Reparación PC", brand: "DOCTOR PC & LAPTOPS", title: "REVIVE TU LAPTOP CON SSD $450", sub: "10 veces más rápida · Incluye mantenimiento térmico, limpieza interna y respaldo", cta: "DIAGNÓSTICO GRATIS", badge: "SOPORTE EXPRESS", icon: "💻", accent: "#3b82f6", dark: true, prompt: "Banner publicitario para soporte técnico 'Doctor PC' con actualización a SSD y mantenimiento" },
      { isPremium: true, type: "banner", label: "Banner Cursos de Inglés VIP", brand: "GLOBAL ENGLISH CENTER", title: "HABLA INGLÉS EN 6 MESES", sub: "Clases presenciales y en línea · Grupos reducidos · Inscripción 50% OFF esta semana", cta: "CLASE MUESTRA GRATIS", badge: "INSCRIPCIONES ABIERTAS", icon: "🎓", accent: "#2563eb", dark: false, prompt: "Banner educativo para escuela de inglés 'Global English' con clase muestra gratis" },
      { type: "banner", label: "Banner Floristería", brand: "PETALS & BLOOMS", title: "RAMOS Y ARREGLOS A DOMICILIO", sub: "Sorprende hoy mismo con rosas de invernadero, tulipanes y chocolates gourmet", cta: "ENVIAR FLORES HOY", badge: "ENTREGA EN 2 HORAS", icon: "🌹", accent: "#f43f5e", dark: false, prompt: "Banner promocional para floristería 'Petals & Blooms' con entrega en 2 horas" },
      { isPremium: true, type: "banner", label: "Banner Inmobiliaria VIP", brand: "CASA IDEAL BIENES RAÍCES", title: "VENDE O RENTA TU PROPIEDAD", sub: "Fotografía con dron, promoción digital, contratos legales seguros y avalúo comercial", cta: "SOLICITAR ASESORÍA", badge: "TRATO SEGURO", icon: "🏢", accent: "#0284c7", dark: true, prompt: "Banner corporativo para inmobiliaria 'Casa Ideal' ofreciendo venta y renta de propiedades" },
      { type: "banner", label: "Banner Contabilidad SAT", brand: "TAX PRO CONSULTORES", title: "DECLARACIÓN MENSUAL DESDE $450", sub: "Especialistas en régimen RESICO, Personas Físicas, PyMEs y Facturación 4.0", cta: "ASESORÍA FISCAL GRATIS", badge: "CONTADORES PÚBLICOS", icon: "📈", accent: "#059669", dark: false, prompt: "Banner corporativo para despacho contable 'Tax Pro' con planes desde $450 al mes" },
      { isPremium: true, type: "banner", label: "Banner Salón de Eventos VIP", brand: "JARDÍN REAL EVENTOS", title: "TU BODA O GRADUACIÓN SOÑADA", sub: "Paquetes todo incluido: Banquete 3 tiempos, mobiliario Tiffany, DJ e iluminación", cta: "APARTAR FECHA 2026", badge: "PAQUETES TODO INCLUIDO", icon: "🥂", accent: "#cdaa7d", dark: true, prompt: "Banner elegante para salón de eventos 'Jardín Real' para bodas y graduaciones" }
    ],
    "📱 Plantillas de Posts para Redes Sociales (20 Diseños Centrados)": [
      { type: "post", label: "Post Cafetería - Pregunta", brand: "AROMA & GRANO", title: "¿CÓMO TOMAS TU CAFÉ HOY?", sub: "Americano Intenso · Capuchino Cremoso · Latte Vainilla · Frappé Caramelo", cta: "COMENTA TU FAVORITO 👇", badge: "COMUNIDAD CAFETERA", icon: "☕", accent: "#d97706", dark: true, prompt: "Post para Instagram de cafetería 'Aroma & Grano' preguntando cómo toman su café hoy" },
      { type: "post", label: "Post Taquería - Viernes", brand: "TACOS EL DORADO", title: "¡HOY ES VIERNES DE TACOS!", sub: "Etiqueta en comentarios a la persona que te debe una orden con salsa brava", cta: "¿QUIÉN PAGA LA CUENTA?", badge: "TRADICIÓN TAQUERA", icon: "🌮", accent: "#f59e0b", dark: true, prompt: "Post para redes de taquería 'Tacos El Dorado' con temática divertida de viernes de tacos" },
      { type: "post", label: "Post Pizzería - Batalla", brand: "LA VERA PIZZA", title: "¿TEAM PEPPERONI O HAWAIANA?", sub: "La batalla definitiva de sabores. Vota en comentarios y te regalamos un cupón sorpresa", cta: "VOTA AHORA CON EMOJIS", badge: "BATALLA DE SABORES", icon: "🍕", accent: "#ea580c", dark: false, prompt: "Post interactivo de pizzería 'La Vera Pizza' preguntando por Team Pepperoni vs Hawaiana" },
      { type: "post", label: "Post Hamburguesas - Antojo", brand: "MONSTER BURGER", title: "EL ANTOJO DE LA SEMANA", sub: "Queso derretido al momento sobre doble carne smashed jugosa. Disponible desde la 1 PM", cta: "GUARDAR ESTE POST 📌", badge: "SMASH FACTORY", icon: "🍔", accent: "#ef4444", dark: true, prompt: "Post para redes de hamburguesería 'Monster Burger' provocando el antojo de la semana" },
      { type: "post", label: "Post Sushi - Tip del Chef", brand: "KURO ZEN", title: "TIP DEL CHEF: EL WASABI", sub: "Nunca mezcles el wasabi directo en la soya; colócalo delicadamente sobre el pescado", cta: "GUARDA Y COMPARTE 🍣", badge: "CULTURA JAPONESA", icon: "🍣", accent: "#e11d48", dark: true, prompt: "Post educativo para Instagram de restaurante de sushi 'Kuro Zen' explicando tip del chef" },
      { type: "post", label: "Post Fitness - Motivación", brand: "POWER FIT GYM", title: "CADA DÍA CUENTA", sub: "La disciplina de hoy es la victoria de mañana. Tu único rival es quien ves en el espejo", cta: "ETIQUETA A TU GYM BRO", badge: "MOTIVACIÓN DIARIA", icon: "💪", accent: "#22c55e", dark: true, prompt: "Post motivacional para redes sociales de gimnasio 'Power Fit Gym' sobre disciplina y constancia" },
      { type: "post", label: "Post Dental - Mito o Realidad", brand: "SONRISA PERFECTA", title: "¿CEPILLAR FUERTE ES MEJOR?", sub: "¡Falso! Cepillar con mucha fuerza desgasta el esmalte y lastima tus encías. Usa cerdas suaves", cta: "COMPARTE CON TU FAMILIA", badge: "SALUD BUCAL", icon: "🦷", accent: "#0ea5e9", dark: false, prompt: "Post de mitos dentales para Instagram de clínica 'Sonrisa Perfecta' sobre el cepillado correcto" },
      { type: "post", label: "Post Barbería - Ritual", brand: "GENTLEMAN BARBER", title: "3 PASOS PARA CUIDAR TU BARBA", sub: "1. Limpieza con shampoo especial · 2. Aceite hidratante · 3. Cepillado con cerdas naturales", cta: "RESERVA TU CORTE", badge: "ESTILO & GROOMING", icon: "💈", accent: "#d97706", dark: true, prompt: "Post estilo carrusel o tip para barbería 'Gentleman Barber' con 3 pasos para cuidar la barba" },
      { type: "post", label: "Post Moda - Look del Día", brand: "AURA LUXE BOUTIQUE", title: "OOTD: ELEGANCIA SIN ESFUERZO", sub: "Tonos neutros combinados con piezas statement. Disponible en tallas XS a XL", cta: "DISPONIBLE EN DM 📩", badge: "NUEVA TENDENCIA", icon: "👗", accent: "#db2777", dark: false, prompt: "Post de moda para boutique 'Aura Luxe' mostrando el Look del Día y detalles de prendas" },
      { type: "post", label: "Post Joyería - Curiosidad", brand: "DIAMANTE REAL", title: "EL VALOR DE LO ETERNO", sub: "Cada gema cuenta una historia geológica de millones de años pulida a la perfección", cta: "CONOCE LA COLECCIÓN", badge: "LUJO & DETALLE", icon: "💎", accent: "#d4af37", dark: true, prompt: "Post sofisticado para joyería 'Diamante Real' destacando la exclusividad y durabilidad de sus piezas" },
      { type: "post", label: "Post Inmobiliaria - Consejos", brand: "CASA IDEAL", title: "3 ERRORES AL COMPRAR CASA", sub: "1. No revisar escrituras · 2. No calcular gastos notariales · 3. Ignorar la ubicación futura", cta: "GUARDA ESTA INFORMACIÓN", badge: "GUÍA INMOBILIARIA", icon: "🏠", accent: "#2563eb", dark: false, prompt: "Post de consejos inmobiliarios para 'Casa Ideal' sobre errores comunes al comprar casa" },
      { type: "post", label: "Post Contable - SAT Clave", brand: "TAX PRO CONSULTORES", title: "EVITA MULTAS ANTE EL SAT", sub: "Factura todos tus gastos deducibles y presenta tu declaración mensual antes del día 17", cta: "ENVÍANOS UN MENSAJE", badge: "TIPS FISCALES", icon: "📊", accent: "#059669", dark: false, prompt: "Post informativo para despacho 'Tax Pro' sobre cómo evitar multas y recargos con el SAT" },
      { type: "post", label: "Post Abogados - Derechos", brand: "JUSTICIA & LEY", title: "¿CONOCES TUS VACACIONES DIGNAS?", sub: "Por ley, desde tu primer año laboral te corresponden 12 días continuos de descanso pagado", cta: "ASESÓRATE HOY MISMO", badge: "DERECHO LABORAL", icon: "⚖️", accent: "#b45309", dark: true, prompt: "Post de derechos laborales para despacho 'Justicia & Ley' explicando vacaciones dignas" },
      { type: "post", label: "Post Mascotas - Cuidado", brand: "HUELLITAS VET", title: "PROTEGE A TU MASCOTA DEL FRÍO", sub: "Coloca una colcha térmica, no los bañes con agua fría y mantén su cartilla de vacunas al día", cta: "¿YA AGENDAS SU CHEQUEO?", badge: "AMOR POR LAS MASCOTAS", icon: "🐾", accent: "#06b6d4", dark: false, prompt: "Post de cuidado animal para 'Huellitas Vet' con recomendaciones de salud en invierno" },
      { type: "post", label: "Post Taller - Alerta Frenos", brand: "AUTOCARE PRO", title: "¿CHIRRIDO AL FRENAR? ¡CUIDADO!", sub: "Es la lámina de aviso de tus balatas indicando que les queda menos del 15% de vida útil", cta: "REVISIÓN GRATUITA HOY", badge: "SEGURIDAD VIAL", icon: "🔧", accent: "#ef4444", dark: true, prompt: "Post de alerta mecánica para 'AutoCare Pro' explicando por qué chirrían los frenos del auto" },
      { type: "post", label: "Post Agencia DMD - Web", brand: "DMD", title: "INSTAGRAM NO ES TU SITIO WEB", sub: "Si cierran tu cuenta pierdes todos tus clientes. Con tu web propia tienes el control absoluto", cta: "CREA TU PÁGINA CON DMD", badge: "ESTRATEGIA DIGITAL", icon: "🚀", accent: "#2563eb", dark: true, prompt: "Post estratégico de 'DMD' explicando por qué una empresa necesita sitio web propio" },
      { type: "post", label: "Post Cursos - Hábito", brand: "EDUMASTER", title: "EL PODER DE 20 MINUTOS AL DÍA", sub: "Aprender una habilidad nueva por 20 minutos diarios equivale a más de 120 horas de ventaja al año", cta: "EMPIEZA HOY TU CURSO", badge: "CRECIMIENTO PERSONAL", icon: "🎓", accent: "#4f46e5", dark: false, prompt: "Post educativo para academia 'EduMaster' inspirando a crear hábitos diarios de estudio" },
      { type: "post", label: "Post Spa - Desconexión", brand: "ZENITH SPA", title: "DATE UN RESPIRO ESTA TARDE", sub: "Cierra los ojos, inhala profundo y date el tiempo que mereces para recargar energía positiva", cta: "AGENDA TU DÍA DE SPA", badge: "BIENESTAR TOTAL", icon: "🌿", accent: "#14b8a6", dark: false, prompt: "Post relajante para redes sociales de 'Zenith Spa' invitando a una pausa y autocuidado" },
      { type: "post", label: "Post Tech - Batería Celular", brand: "DOCTOR PC", title: "NO DEJES TU CELULAR EN 100%", sub: "Mantener tu smartphone entre el 20% y el 80% prolonga hasta por 2 años la salud de la batería", cta: "COMPARTE ESTE CONSEJO", badge: "TECNOLOGÍA PRÁCTICA", icon: "📱", accent: "#3b82f6", dark: true, prompt: "Post de consejos tecnológicos para 'Doctor PC' sobre cómo cuidar la batería del celular" },
      { type: "post", label: "Post Belleza - Uñas Tendencia", brand: "GLAMOUR STUDIO", title: "TENDENCIAS EN UÑAS 2026", sub: "Efecto glaseado, tonos pastel y minimalismo francés. ¿Cuál pedirás en tu próxima cita?", cta: "GUARDA TU DISEÑO", badge: "NAIL ART & BEAUTY", icon: "💅", accent: "#ec4899", dark: false, prompt: "Post de belleza para 'Glamour Studio' mostrando las tendencias de uñas del 2026" }
    ],
    "🎯 Plantillas de Publicidad & Anuncios Promocionales (20 Diseños de Alto Impacto)": [
      { type: "publicidad", label: "Anuncio Promo Flash 50%", brand: "DMD MEGA SALE", title: "¡50% DE DESCUENTO FLASH!", sub: "Válido únicamente durante las próximas 48 horas en compras en línea o sucursal", cta: "OBTENER MI DESCUENTO →", badge: "OFERTA RELÁMPAGO", icon: "⚡", accent: "#ef4444", dark: true, prompt: "Anuncio publicitario de alto impacto con 50% de descuento flash y oferta relámpago" },
      { type: "publicidad", label: "Anuncio Paquete Web PyME", brand: "DMD", title: "TU PÁGINA WEB POR $1,099", sub: "Incluye Dominio, Hosting, Diseño con IA, Logotipo Vectorial y Tarjetas con QR", cta: "CONTRATAR PAQUETE YA", badge: "PAQUETE OFICIAL PYME", icon: "🚀", accent: "#2563eb", dark: true, prompt: "Anuncio comercial para DMD vendiendo paquete web PyME completo en $1,099" },
      { type: "publicidad", label: "Anuncio Cupón $200 MXN", brand: "SUPER FOODS", title: "CUPÓN DE $200 MXN GRATIS", sub: "Usa el código PROMODMD al ordenar por WhatsApp en tu consumo mínimo de $400", cta: "CANJEAR CUPÓN HOY", badge: "CUPÓN EXCLUSIVO", icon: "🎟️", accent: "#10b981", dark: false, prompt: "Anuncio publicitario con cupón de $200 MXN de regalo usando código promocional" },
      { type: "publicidad", label: "Anuncio Gran Inauguración", brand: "CAFÉ DE LA PLAZA", title: "¡GRAN INAUGURACIÓN OFICIAL!", sub: "Este sábado 10:00 AM · Primeras 50 personas reciben bebida de cortesía y postre gratis", cta: "ASISTIR AL EVENTO", badge: "NUEVA SUCURSAL", icon: "🎉", accent: "#d97706", dark: true, prompt: "Flyer publicitario de gran inauguración con bebida de cortesía para las primeras 50 personas" },
      { type: "publicidad", label: "Anuncio Combo Estudiante", brand: "BURGER CRUSH", title: "COMBO UNIVERSITARIO × $79", sub: "Presenta tu credencial escolar vigente: Hamburguesa + Papas Francesas + Refresco", cta: "MOSTRAR CREDENCIAL", badge: "SOLO ESTUDIANTES", icon: "🍔", accent: "#ea580c", dark: false, prompt: "Anuncio publicitario con combo universitario a precio accesible para estudiantes con credencial" },
      { type: "publicidad", label: "Anuncio Liquidación 70%", brand: "OUTLET MODA URBANA", title: "LIQUIDACIÓN TOTAL HASTA 70%", sub: "Todo el calzado, sudaderas y chamarras deben salir. Últimas piezas en existencia", cta: "IR AL OUTLET AHORA", badge: "REMATE DE INVENTARIO", icon: "🏷️", accent: "#f43f5e", dark: true, prompt: "Anuncio de alto impacto para remate de inventario y liquidación total con hasta 70% de descuento" },
      { type: "publicidad", label: "Anuncio Lanzamiento", brand: "TECH LAB INNOVATION", title: "EL FUTURO HA LLEGADO HOY", sub: "Descubre nuestra nueva línea de software empresarial impulsada por Inteligencia Artificial", cta: "SOLICITAR DEMO GRATIS", badge: "NUEVO LANZAMIENTO", icon: "🤖", accent: "#6366f1", dark: true, prompt: "Anuncio publicitario de lanzamiento tecnológico con solicitud de demostración gratuita" },
      { type: "publicidad", label: "Anuncio Gran Sorteo", brand: "COMUNIDAD DMD", title: "¡GANA UNA LAPTOP O WEB!", sub: "Participa en nuestra dinámica anual para emprendedores y universitarios del Estado de México", cta: "REGÍSTRATE GRATIS", badge: "GRAN SORTEO ANUAL", icon: "🎁", accent: "#059669", dark: true, prompt: "Anuncio promocional para sorteo o giveaway de una laptop o sitio web profesional" },
      { type: "publicidad", label: "Anuncio Afinación $699", brand: "TALLER AUTOMOTRIZ MASTER", title: "AFINACIÓN COMPLETA × $699", sub: "Incluye 4 bujías, aceite sintético, filtro de aire y escaneo electrónico de cortesía", cta: "APARTAR CITA POR WHATSAPP", badge: "GARANTÍA TOTAL", icon: "🚗", accent: "#dc2626", dark: false, prompt: "Flyer publicitario de taller mecánico con afinación en promoción a $699 con garantía" },
      { type: "publicidad", label: "Anuncio Gym Anualidad", brand: "TITAN GYM CLUB", title: "PAGA 10 MESES Y RECIBE 12", sub: "Acceso ilimitado a peso libre, máquinas de última generación y vestidores con regaderas", cta: "INSCRIBIRME HOY", badge: "MEMBRESÍA VIP", icon: "💪", accent: "#16a34a", dark: true, prompt: "Anuncio para gimnasio vendiendo membresía anual con 2 meses gratis" },
      { type: "publicidad", label: "Anuncio Dental 2x1", brand: "CLÍNICA DENTAL SMILE", title: "2 LIMPIEZAS DENTALES × $450", sub: "Ven acompañado con tu pareja o familiar y aprovechen el paquete ultrasónico 2×1", cta: "AGENDAR CITA 2X1", badge: "PROMOCIÓN EN PAREJA", icon: "🦷", accent: "#0284c7", dark: false, prompt: "Anuncio publicitario de clínica dental con 2 limpiezas por $450 en promoción 2x1" },
      { type: "publicidad", label: "Anuncio Curso Intensivo", brand: "ACADEMIA DIGITAL PRO", title: "APRENDE IA EN 4 SEMANAS", sub: "Clases prácticas 100% online con profesores en vivo y proyectos reales para tu portafolio", cta: "APLICAR A BECA DEL 50%", badge: "BECA DISPONIBLE", icon: "📚", accent: "#7c3aed", dark: true, prompt: "Anuncio para academia digital ofreciendo curso intensivo con beca del 50% de descuento" },
      { type: "publicidad", label: "Anuncio Paquete Bodas", brand: "HACIENDA REAL EVENTOS", title: "PAQUETE NUPCIAL TODO INCLUIDO", sub: "Jardín iluminado, banquete de 3 tiempos, grupo musical en vivo y barra libre de bebidas", cta: "COTIZAR MI BODA", badge: "TEMPORADA 2026", icon: "💍", accent: "#cdaa7d", dark: true, prompt: "Anuncio elegante para hacienda de eventos con paquete nupcial todo incluido" },
      { type: "publicidad", label: "Anuncio Tarjetas $280", brand: "IMPRESIONES EXPRESS", title: "1,000 TARJETAS FULL COLOR $280", sub: "Papel grueso barnizado de alta durabilidad con esquinas redondeadas y diseño incluido", cta: "MANDAR A IMPRIMIR", badge: "ENTREGA EN 24 HORAS", icon: "📇", accent: "#2563eb", dark: false, prompt: "Anuncio comercial para imprenta con 1,000 tarjetas de presentación a $280 con entrega express" },
      { type: "publicidad", label: "Anuncio Fletes & Mudanzas", brand: "MUDANZAS SEGURAS MX", title: "MUDANZAS LOCALES DESDE $450", sub: "Camiones cerrados con colchonetas, empaque cuidadoso de muebles y choferes certificados", cta: "PEDIR COTIZACIÓN INMEDIATA", badge: "VIAJE ASEGURADO", icon: "🚚", accent: "#ea580c", dark: false, prompt: "Anuncio publicitario para empresa de mudanzas y fletes con servicio asegurado" },
      { type: "publicidad", label: "Anuncio Asesoría Legal Gratis", brand: "DEFENSA & ASOCIADOS", title: "PRIMERA ASESORÍA LEGAL SIN COSTO", sub: "Especialistas en temas civiles, laborales, contratos y protección patrimonial familiar", cta: "AGENDAR CITA CONFIDENCIAL", badge: "CONSULTA PRIVADA", icon: "⚖️", accent: "#b45309", dark: true, prompt: "Anuncio corporativo para abogados ofreciendo primera asesoría legal gratuita y confidencial" },
      { type: "publicidad", label: "Anuncio Campaña Vacunas", brand: "CENTRO VETERINARIO PETS", title: "VACUNACIÓN + DESPARASITACIÓN $199", sub: "Protege a tu cachorro o gatito contra las principales enfermedades esta temporada", cta: "AGENDAR CITA VETERINARIA", badge: "SALUD PARA TU MASCOTA", icon: "🐕", accent: "#0891b2", dark: false, prompt: "Anuncio promocional para veterinaria con campaña de vacunación a $199" },
      { type: "publicidad", label: "Anuncio Vacante Empleo", brand: "GRUPO EMPRESARIAL DMD", title: "¡ESTAMOS CONTRATANDO TALENTO!", sub: "Buscamos Desarrolladores Web, Diseñadores UI y Asesores de Ventas con excelente ambiente", cta: "ENVIAR MI CURRÍCULUM", badge: "VACANTES ABIERTAS", icon: "💼", accent: "#059669", dark: true, prompt: "Anuncio de reclutamiento laboral y vacantes abiertas para integrarse al equipo" },
      { type: "publicidad", label: "Anuncio Envío Gratis", brand: "TIENDA ONLINE MULTIESTILO", title: "ENVÍO GRATIS A TODO EL MUNICIPIO", sub: "En todas tus compras a partir de $299 MXN durante este fin de semana de quincena", cta: "COMPRAR EN TIENDA EN LÍNEA", badge: "SIN COSTO DE ENTREGA", icon: "📦", accent: "#4f46e5", dark: true, prompt: "Anuncio de comercio electrónico con envío gratis a partir de $299 durante el fin de semana" },
      { type: "publicidad", label: "Anuncio Lotes Preventa", brand: "DESARROLLOS DEL VALLE", title: "LOTES DESDE $1,500 AL MES", sub: "Zona con alta plusvalía, servicios a pie de calle, escrituración inmediata y facilidades de pago", cta: "SOLICITAR UBICACIONES", badge: "PREVENTA EXCLUSIVA", icon: "🏞️", accent: "#15803d", dark: false, prompt: "Anuncio publicitario de preventa inmobiliaria con terrenos y facilidades de pago mensuales" }
    ]
  };

  function escapeXML(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  // Analiza cualquier prompt de usuario y extrae datos para Logo, Banner, Post o Publicidad
  function parsePromptToGraphicConfig(promptText, forcedType, colorVal, styleVal, presetObj) {
    if (presetObj) {
      return {
        type: forcedType || presetObj.type || "logo",
        brand: presetObj.brand,
        title: presetObj.title || presetObj.brand,
        sub: presetObj.sub || "CALIDAD Y CONFIANZA GARANTIZADA",
        cta: presetObj.cta || "CONTACTAR POR WHATSAPP",
        badge: presetObj.badge || "EDICIÓN OFICIAL",
        icon: presetObj.icon || "✦",
        shape: presetObj.shape || "hex",
        accent: colorVal || presetObj.accent || "#2563eb",
        dark: styleVal ? (styleVal === "oscuro") : Boolean(presetObj.dark),
        prompt: promptText
      };
    }

    const p = (promptText || "").toLowerCase();
    let detectedType = forcedType;
    if (!detectedType) {
      if (/post|redes|instagram|facebook|historia|feed|tiktok|tweet|carrusel/.test(p)) {
        detectedType = "post";
      } else if (/publicidad|anuncio|flyer|cartel|oferta flash|descuento 50%|cup[oó]n|rebaja|remate|sale/.test(p)) {
        detectedType = "publicidad";
      } else if (/banner|portada|encabezado|cabecera/.test(p)) {
        detectedType = "banner";
      } else {
        detectedType = "logo";
      }
    }

    let customBrand = "";
    const quoteMatch = promptText.match(/['"“”]([^'"“”]{2,32})['"“”]/);
    const llamadaMatch = promptText.match(/llamad[oa]\s+([A-ZÁÉÍÓÚÑ][A-Za-záéíóúñ0-9\s&]{2,26})/i);
    if (quoteMatch) {
      customBrand = quoteMatch[1].trim().toUpperCase();
    } else if (llamadaMatch) {
      customBrand = llamadaMatch[1].split(/\s+(con|de|para|en|que)\s+/i)[0].trim().toUpperCase();
    }

    let icon = "✦";
    let defaultBrand = "DMD";
    let sub = "EXCELENCIA, INNOVACIÓN & CALIDAD";
    let bannerTitle = "PROMOCIÓN ESPECIAL DE TEMPORADA";
    let badge = "OFERTA DESTACADA";
    let cta = "SOLICITAR POR WHATSAPP →";
    let shape = "hex";

    if (/caf[eé]|cafeter|barista|espresso|grano|panader|pasteler/.test(p)) {
      icon = "☕"; defaultBrand = "AROMA & GRANO"; sub = "CAFÉ DE ESPECIALIDAD & PAN ARTESANAL";
      bannerTitle = "2×1 EN CAFÉ DE ESPECIALIDAD"; badge = "RECIÉN TOSTADO"; cta = "PEDIR O RESERVAR →"; shape = "circle";
    } else if (/pizza|restaurante|comida|taco|taquer|sushi|burger|hamburguesa|cocina|marisco/.test(p)) {
      icon = "🍽️"; defaultBrand = "SABOR & FUEGO"; sub = "GASTRONOMÍA ARTESANAL DE AUTOR";
      bannerTitle = "ESPECIALIDADES AL 2×1 HOY MISMO"; badge = "ENVÍO SIN COSTO"; cta = "ORDENAR POR WHATSAPP →"; shape = "shield";
    } else if (/gimnasio|gym|fitness|crossfit|deporte|entrena/.test(p)) {
      icon = "💪"; defaultBrand = "POWER FIT GYM"; sub = "TRAINING & ALTO RENDIMIENTO";
      bannerTitle = "INSCRIPCIÓN GRATIS + PASE DE 3 DÍAS"; badge = "ENTRENA HOY"; cta = "ACTIVAR PROMOCIÓN →"; shape = "hex";
    } else if (/dental|dentista|m[eé]dic|cl[ií]nica|salud|spa|veterinar|huellita/.test(p)) {
      icon = "🩺"; defaultBrand = "SALUD INTEGRAL"; sub = "ESPECIALISTAS CERTIFICADOS";
      bannerTitle = "VALORACIÓN + DIAGNÓSTICO $299 MXN"; badge = "AGENDA EN LÍNEA"; cta = "AGENDAR CITA HOY →"; shape = "circle";
    } else if (/boutique|moda|ropa|joyer|tienda|zapater|sneaker|florer|florister|belleza|uñas|barber/.test(p)) {
      icon = "💎"; defaultBrand = "AURA LUXE STUDIO"; sub = "DISEÑO EXCLUSIVO & TENDENCIA";
      bannerTitle = "NUEVA COLECCIÓN CON 30% OFF"; badge = "EDICIÓN LIMITADA"; cta = "VER CATÁLOGO →"; shape = "diamond";
    } else if (/abogad|jur[ií]dic|contad|fiscal|inmobiliar|arquitec|ingenier/.test(p)) {
      icon = "⚖️"; defaultBrand = "FIRMA CORPORATIVA"; sub = "ASESORÍA PROFESIONAL & RESULTADOS";
      bannerTitle = "PRIMERA ASESORÍA TÉCNICA SIN COSTO"; badge = "ATENCIÓN PROFESIONAL"; cta = "AGENDAR CONSULTA →"; shape = "shield";
    }

    const finalBrand = customBrand || defaultBrand;
    if (detectedType !== "logo" && promptText.length > 8 && !presetObj) {
      const cleanHeadline = promptText.replace(/post|redes|banner|publicidad|anuncio|para|llamad[oa]|['"“”]/gi, "").trim();
      if (cleanHeadline.length >= 6 && cleanHeadline.length <= 48) {
        bannerTitle = cleanHeadline.toUpperCase();
      }
    }

    return {
      type: detectedType,
      brand: finalBrand,
      title: bannerTitle,
      sub: sub,
      cta: cta,
      badge: badge,
      icon: icon,
      shape: shape,
      accent: colorVal || "#2563eb",
      dark: styleVal !== "claro",
      prompt: promptText
    };
  }

  let graphicSvgCounter = 0;

  function wrapTextToLines(text, maxCharsPerLine = 26, maxLines = 2) {
    if (!text) return [""];
    const words = String(text).trim().split(/\s+/);
    const lines = [];
    let current = "";
    for (const word of words) {
      if (!current) {
        current = word;
      } else if ((current + " " + word).length <= maxCharsPerLine) {
        current += " " + word;
      } else {
        lines.push(current);
        current = word;
        if (lines.length >= maxLines - 1) break;
      }
    }
    if (current && lines.length < maxLines) {
      lines.push(current);
    }
    return lines;
  }

  // Genera SVG vectorial en alta definición para: Logo (800x500), Banner (900x450), Post Redes (800x800), Publicidad (800x1000)
  function buildSVGForGraphic(cfg) {
    graphicSvgCounter++;
    const uid = 'dmd_gfx_' + graphicSvgCounter + '_' + Math.random().toString(36).substring(2, 7);
    const isDark = Boolean(cfg.dark);
    const bg1 = cfg.bg1 || (isDark ? "#090d16" : "#ffffff");
    const bg2 = cfg.bg2 || (isDark ? "#162038" : "#f1f5f9");
    const textMain = isDark ? "#ffffff" : "#0f172a";
    const textSub = isDark ? "#cbd5e1" : "#475569";
    const accent = cfg.accent || "#2563eb";

    if (cfg.type === "logo") {
      let emblemSVG = "";
      if (cfg.shape === "circle") {
        emblemSVG = `
          <circle cx="400" cy="175" r="78" fill="${accent}22" stroke="${accent}" stroke-width="5"/>
          <circle cx="400" cy="175" r="62" fill="${accent}" />
        `;
      } else if (cfg.shape === "diamond") {
        emblemSVG = `
          <polygon points="400,88 485,175 400,262 315,175" fill="${accent}22" stroke="${accent}" stroke-width="5"/>
          <polygon points="400,104 470,175 400,246 330,175" fill="${accent}"/>
        `;
      } else if (cfg.shape === "shield") {
        emblemSVG = `
          <path d="M400 92 L472 122 L472 182 C472 228 400 262 400 262 C400 262 328 228 328 182 L328 122 Z" fill="${accent}" stroke="${textMain}" stroke-width="4"/>
        `;
      } else {
        emblemSVG = `
          <polygon points="400,92 472,133 472,217 400,258 328,217 328,133" fill="${accent}" stroke="${textMain}" stroke-width="4"/>
        `;
      }

      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgGradLogo_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bg1}"/>
            <stop offset="100%" stop-color="${bg2}"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" rx="24" fill="url(#bgGradLogo_${uid})"/>
        <rect x="24" y="24" width="752" height="452" rx="18" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="2"/>
        <circle cx="110" cy="90" r="140" fill="${accent}" fill-opacity="0.06"/>
        <circle cx="700" cy="420" r="160" fill="${accent}" fill-opacity="0.06"/>
        ${emblemSVG}
        <text x="400" y="196" text-anchor="middle" font-size="56" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif">${escapeXML(cfg.icon)}</text>
        <text x="400" y="340" text-anchor="middle" font-family="Montserrat, Inter, sans-serif" font-size="44" font-weight="900" fill="${textMain}" letter-spacing="4">${escapeXML(cfg.brand)}</text>
        <line x1="270" y1="366" x2="530" y2="366" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
        <text x="400" y="402" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" font-weight="700" fill="${textSub}" letter-spacing="3">${escapeXML(cfg.sub)}</text>
        <text x="400" y="452" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="${accent}" opacity="0.85">DISEÑO VECTORIAL OFICIAL · DMD</text>
      </svg>`;
    }

    if (cfg.type === "banner") {
      const bannerTitleLines = wrapTextToLines(cfg.title, 26, 2);
      const bannerSubLines = wrapTextToLines(cfg.sub, 55, 2);
      const hasSecondTitle = bannerTitleLines.length > 1;

      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 450" width="100%" height="100%">
        <defs>
          <linearGradient id="banGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bg1}"/>
            <stop offset="100%" stop-color="${bg2}"/>
          </linearGradient>
        </defs>
        <rect width="900" height="450" rx="22" fill="url(#banGrad_${uid})"/>
        <circle cx="780" cy="225" r="240" fill="${accent}" fill-opacity="0.14"/>
        <circle cx="755" cy="225" r="155" fill="${accent}" fill-opacity="0.22" stroke="${accent}" stroke-width="3"/>
        <circle cx="755" cy="225" r="112" fill="${accent}"/>
        <text x="755" y="252" text-anchor="middle" font-size="82" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif">${escapeXML(cfg.icon)}</text>
        <rect x="56" y="54" width="230" height="34" rx="17" fill="${accent}"/>
        <text x="171" y="76" text-anchor="middle" font-family="Inter, sans-serif" font-size="13" font-weight="900" fill="#ffffff" letter-spacing="1.5">★ ${escapeXML(cfg.badge)}</text>
        <text x="56" y="132" font-family="Montserrat, Inter, sans-serif" font-size="16" font-weight="800" fill="${accent}" letter-spacing="2">${escapeXML(cfg.brand)}</text>
        <text x="56" y="195" font-family="Montserrat, Inter, sans-serif" font-size="36" font-weight="900" fill="${textMain}">${escapeXML(bannerTitleLines[0])}</text>
        ${hasSecondTitle ? `<text x="56" y="238" font-family="Montserrat, Inter, sans-serif" font-size="34" font-weight="900" fill="${textMain}">${escapeXML(bannerTitleLines[1])}</text>` : ""}
        <text x="56" y="${hasSecondTitle ? 282 : 252}" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="${textSub}">${escapeXML(bannerSubLines[0])}</text>
        ${bannerSubLines.length > 1 ? `<text x="56" y="${hasSecondTitle ? 306 : 276}" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="${textSub}">${escapeXML(bannerSubLines[1])}</text>` : ""}
        <rect x="56" y="340" width="290" height="54" rx="14" fill="${accent}"/>
        <text x="201" y="373" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" font-weight="900" fill="#ffffff" letter-spacing="1">${escapeXML(cfg.cta)}</text>
      </svg>`;
    }

    if (cfg.type === "post") {
      const postTitleLines = wrapTextToLines(cfg.title, 32, 2);
      const postSubLines = wrapTextToLines(cfg.sub, 60, 2);
      const hasPostSecondTitle = postTitleLines.length > 1;

      // Post / Banner Centrado para Redes Sociales (900x450) Proporción 2:1 Centrado
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 450" width="100%" height="100%">
        <defs>
          <linearGradient id="postGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bg1}"/>
            <stop offset="100%" stop-color="${bg2}"/>
          </linearGradient>
        </defs>
        <rect width="900" height="450" rx="22" fill="url(#postGrad_${uid})"/>
        <rect x="20" y="20" width="860" height="410" rx="18" fill="none" stroke="${accent}" stroke-opacity="0.25" stroke-width="2"/>
        
        <!-- Emblema / Icono Central -->
        <circle cx="450" cy="105" r="68" fill="${accent}" fill-opacity="0.12"/>
        <circle cx="450" cy="105" r="46" fill="${accent}" stroke="${textMain}" stroke-width="3"/>
        <text x="450" y="122" text-anchor="middle" font-size="40" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif">${escapeXML(cfg.icon)}</text>
        
        <!-- Badge Centrado -->
        <rect x="330" y="165" width="240" height="26" rx="13" fill="${accent}"/>
        <text x="450" y="182" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="900" fill="#ffffff" letter-spacing="1.5">✦ ${escapeXML(cfg.badge)} ✦</text>
        
        <!-- Marca Centrada -->
        <text x="450" y="214" text-anchor="middle" font-family="Montserrat, Inter, sans-serif" font-size="15" font-weight="800" fill="${accent}" letter-spacing="2.5">${escapeXML(cfg.brand)}</text>
        
        <!-- Título Centrado -->
        <text x="450" y="${hasPostSecondTitle ? 250 : 258}" text-anchor="middle" font-family="Montserrat, Inter, sans-serif" font-size="24" font-weight="900" fill="${textMain}">${escapeXML(postTitleLines[0])}</text>
        ${hasPostSecondTitle ? `<text x="450" y="282" text-anchor="middle" font-family="Montserrat, Inter, sans-serif" font-size="22" font-weight="900" fill="${textMain}">${escapeXML(postTitleLines[1])}</text>` : ""}
        
        <!-- Subtítulo Centrado -->
        <text x="450" y="${hasPostSecondTitle ? 314 : 296}" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="${textSub}">${escapeXML(postSubLines[0])}</text>
        ${postSubLines.length > 1 ? `<text x="450" y="${hasPostSecondTitle ? 334 : 316}" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="${textSub}">${escapeXML(postSubLines[1])}</text>` : ""}

        <!-- Botón CTA Centrado -->
        <rect x="310" y="358" width="280" height="44" rx="14" fill="${accent}"/>
        <text x="450" y="386" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="900" fill="#ffffff" letter-spacing="1">${escapeXML(cfg.cta)}</text>
        
        <text x="450" y="424" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="${textSub}">@${escapeXML(cfg.brand.toLowerCase().replace(/[^a-z0-9]+/g, ''))} · Síguenos en Redes Sociales</text>
      </svg>`;
    }

    // cfg.type === "publicidad" -> Cartel / Flyer Publicitario de Alto Impacto (800x1000)
    const adTitleLines = wrapTextToLines(cfg.title, 24, 2);
    const adSubLines = wrapTextToLines(cfg.sub, 50, 2);
    const hasAdSecondTitle = adTitleLines.length > 1;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
      <defs>
        <linearGradient id="adGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg1}"/>
          <stop offset="100%" stop-color="${bg2}"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" rx="30" fill="url(#adGrad_${uid})"/>
      <rect x="28" y="28" width="744" height="944" rx="24" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="3" stroke-dasharray="10 6"/>
      
      <!-- Cinta superior -->
      <path d="M28 28 L772 28 L772 110 L28 110 Z" fill="${accent}" rx="24"/>
      <text x="400" y="74" text-anchor="middle" font-family="Montserrat, Inter, sans-serif" font-size="24" font-weight="900" fill="#ffffff" letter-spacing="3">🔥 ${escapeXML(cfg.badge)} 🔥</text>
      
      <!-- Icono central gigante con resplandor -->
      <circle cx="400" cy="260" r="125" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-width="3"/>
      <circle cx="400" cy="260" r="88" fill="${accent}"/>
      <text x="400" y="294" text-anchor="middle" font-size="76" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif">${escapeXML(cfg.icon)}</text>
      
      <text x="400" y="430" text-anchor="middle" font-family="Montserrat, Inter, sans-serif" font-size="22" font-weight="800" fill="${accent}" letter-spacing="4">${escapeXML(cfg.brand)}</text>
      
      <!-- Titular Comercial -->
      <text x="400" y="495" text-anchor="middle" font-family="Montserrat, Inter, sans-serif" font-size="40" font-weight="900" fill="${textMain}">${escapeXML(adTitleLines[0])}</text>
      ${hasAdSecondTitle ? `<text x="400" y="545" text-anchor="middle" font-family="Montserrat, Inter, sans-serif" font-size="36" font-weight="900" fill="${textMain}">${escapeXML(adTitleLines[1])}</text>` : ""}
      
      <!-- Caja de oferta destacada -->
      <rect x="80" y="${hasAdSecondTitle ? 590 : 550}" width="640" height="125" rx="18" fill="${accent}15" stroke="${accent}" stroke-width="2"/>
      <text x="400" y="${hasAdSecondTitle ? 638 : 598}" text-anchor="middle" font-family="Inter, sans-serif" font-size="18" font-weight="700" fill="${textMain}">${escapeXML(adSubLines[0])}</text>
      ${adSubLines.length > 1 ? `<text x="400" y="${hasAdSecondTitle ? 670 : 630}" text-anchor="middle" font-family="Inter, sans-serif" font-size="17" font-weight="600" fill="${textSub}">${escapeXML(adSubLines[1])}</text>` : ""}
      <text x="400" y="${hasAdSecondTitle ? 698 : 658}" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="800" fill="${accent}">✔ GARANTÍA DE SATISFACCIÓN · ATENCIÓN INMEDIATA</text>

      <!-- Botón CTA Publicitario -->
      <rect x="180" y="780" width="440" height="68" rx="20" fill="${accent}"/>
      <text x="400" y="823" text-anchor="middle" font-family="Montserrat, Inter, sans-serif" font-size="20" font-weight="900" fill="#ffffff" letter-spacing="1.5">${escapeXML(cfg.cta)}</text>
      
      <!-- Footer del Flyer -->
      <line x1="120" y1="885" x2="680" y2="885" stroke="${textSub}" stroke-opacity="0.3" stroke-width="1.5"/>
      <text x="400" y="920" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="${textMain}">📲 WhatsApp Oficial: +52 762 106 8212 · Jocotitlán, Méx.</text>
      <text x="400" y="945" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="${textSub}">Campaña Publicitaria Oficial · DMD 2026</text>
    </svg>`;
  }

  // Envía el diseño generado por IA directamente al lienzo editable de Fabric.js (#dmdDesignCanvas)
  function sendGraphicToFabricCanvas(cfg, scrollIntoCanvas) {
    const fCanvas = window.dmdFabricCanvas;
    if (!fCanvas || typeof fabric === "undefined") return;

    const bg1 = cfg.dark ? "#0b0f19" : "#ffffff";
    const textMain = cfg.dark ? "#ffffff" : "#0f172a";
    const textSub = cfg.dark ? "#cbd5e1" : "#475569";
    const accent = cfg.accent || "#2563eb";

    fCanvas.clear();

    if (cfg.type === "logo") {
      fCanvas.setDimensions({ width: 800, height: 500 });
      fCanvas.setBackgroundColor(bg1, () => fCanvas.renderAll());

      const borderRect = new fabric.Rect({
        left: 24, top: 24, width: 752, height: 452,
        fill: "transparent", stroke: accent, strokeWidth: 2, rx: 16, ry: 16
      });

      const emblemOuter = new fabric.Circle({
        left: 325, top: 90, radius: 75,
        fill: accent, stroke: textMain, strokeWidth: 4
      });

      const iconText = new fabric.IText(cfg.icon, {
        left: 372, top: 132, fontFamily: "Inter", fontSize: 54, fill: "#ffffff"
      });

      const brandTitle = new fabric.IText(cfg.brand, {
        left: 180, top: 285, fontFamily: "Montserrat", fontSize: 44, fontWeight: "bold", fill: textMain
      });

      const dividerLine = new fabric.Rect({
        left: 260, top: 348, width: 280, height: 4, fill: accent, rx: 2, ry: 2
      });

      const subTitle = new fabric.IText(cfg.sub, {
        left: 200, top: 368, fontFamily: "Inter", fontSize: 18, fontWeight: "bold", fill: textSub
      });

      fCanvas.add(borderRect, emblemOuter, iconText, brandTitle, dividerLine, subTitle);
      brandTitle.centerH();
      iconText.centerH();
      subTitle.centerH();
      fCanvas.renderAll();
    } else if (cfg.type === "banner") {
      fCanvas.setDimensions({ width: 900, height: 450 });
      fCanvas.setBackgroundColor(bg1, () => fCanvas.renderAll());

      const rightCircleOuter = new fabric.Circle({
        left: 610, top: 80, radius: 145, fill: accent, opacity: 0.2
      });

      const rightCircleInner = new fabric.Circle({
        left: 645, top: 115, radius: 110, fill: accent
      });

      const iconText = new fabric.IText(cfg.icon, {
        left: 718, top: 185, fontFamily: "Inter", fontSize: 74, fill: "#ffffff"
      });

      const badgeRect = new fabric.Rect({
        left: 55, top: 52, width: 230, height: 34, fill: accent, rx: 17, ry: 17
      });

      const badgeText = new fabric.IText("★ " + cfg.badge, {
        left: 75, top: 61, fontFamily: "Inter", fontSize: 13, fontWeight: "bold", fill: "#ffffff"
      });

      const brandText = new fabric.IText(cfg.brand, {
        left: 55, top: 108, fontFamily: "Montserrat", fontSize: 16, fontWeight: "bold", fill: accent
      });

      const mainTitle = new fabric.IText(cfg.title, {
        left: 55, top: 142, fontFamily: "Montserrat", fontSize: 32, fontWeight: "bold", fill: textMain
      });

      const subText = new fabric.IText(cfg.sub, {
        left: 55, top: 215, fontFamily: "Inter", fontSize: 16, fill: textSub
      });

      const ctaRect = new fabric.Rect({
        left: 55, top: 325, width: 280, height: 52, fill: accent, rx: 12, ry: 12
      });

      const ctaText = new fabric.IText(cfg.cta, {
        left: 85, top: 342, fontFamily: "Inter", fontSize: 16, fontWeight: "bold", fill: "#ffffff"
      });

      fCanvas.add(rightCircleOuter, rightCircleInner, iconText, badgeRect, badgeText, brandText, mainTitle, subText, ctaRect, ctaText);
      fCanvas.renderAll();
    } else if (cfg.type === "post") {
      // Post de Redes Sociales (800x800)
      fCanvas.setDimensions({ width: 800, height: 800 });
      fCanvas.setBackgroundColor(bg1, () => fCanvas.renderAll());

      const borderRect = new fabric.Rect({
        left: 32, top: 32, width: 736, height: 736,
        fill: "transparent", stroke: accent, strokeWidth: 2, rx: 20, ry: 20
      });

      const iconCircle = new fabric.Circle({
        left: 310, top: 130, radius: 90, fill: accent, stroke: textMain, strokeWidth: 4
      });

      const iconText = new fabric.IText(cfg.icon, {
        left: 360, top: 160, fontFamily: "Inter", fontSize: 72, fill: "#ffffff"
      });

      const badgeRect = new fabric.Rect({
        left: 260, top: 340, width: 280, height: 34, fill: accent, rx: 17, ry: 17
      });

      const badgeText = new fabric.IText("✦ " + cfg.badge + " ✦", {
        left: 280, top: 348, fontFamily: "Inter", fontSize: 13, fontWeight: "bold", fill: "#ffffff"
      });

      const brandText = new fabric.IText(cfg.brand, {
        left: 300, top: 400, fontFamily: "Montserrat", fontSize: 22, fontWeight: "bold", fill: accent
      });

      const mainTitle = new fabric.IText(cfg.title, {
        left: 100, top: 450, fontFamily: "Montserrat", fontSize: 34, fontWeight: "bold", fill: textMain
      });

      const subText = new fabric.IText(cfg.sub, {
        left: 120, top: 540, fontFamily: "Inter", fontSize: 17, fill: textSub
      });

      const ctaRect = new fabric.Rect({
        left: 240, top: 640, width: 320, height: 54, fill: accent, rx: 16, ry: 16
      });

      const ctaText = new fabric.IText(cfg.cta, {
        left: 260, top: 656, fontFamily: "Inter", fontSize: 16, fontWeight: "bold", fill: "#ffffff"
      });

      fCanvas.add(borderRect, iconCircle, iconText, badgeRect, badgeText, brandText, mainTitle, subText, ctaRect, ctaText);
      iconCircle.centerH();
      iconText.centerH();
      badgeRect.centerH();
      badgeText.centerH();
      brandText.centerH();
      mainTitle.centerH();
      subText.centerH();
      ctaRect.centerH();
      ctaText.centerH();
      fCanvas.renderAll();
      if (typeof window.updateCanvasResponsiveScale === "function") {
        window.updateCanvasResponsiveScale();
      }
    } else {
      // Publicidad & Flyer (800x1000)
      fCanvas.setDimensions({ width: 800, height: 1000 });
      fCanvas.setBackgroundColor(bg1, () => fCanvas.renderAll());

      const topBar = new fabric.Rect({
        left: 28, top: 28, width: 744, height: 80, fill: accent, rx: 18, ry: 18
      });

      const topBarText = new fabric.IText("🔥 " + cfg.badge + " 🔥", {
        left: 240, top: 52, fontFamily: "Montserrat", fontSize: 22, fontWeight: "bold", fill: "#ffffff"
      });

      const iconCircle = new fabric.Circle({
        left: 312, top: 170, radius: 88, fill: accent
      });

      const iconText = new fabric.IText(cfg.icon, {
        left: 360, top: 205, fontFamily: "Inter", fontSize: 76, fill: "#ffffff"
      });

      const brandText = new fabric.IText(cfg.brand, {
        left: 280, top: 400, fontFamily: "Montserrat", fontSize: 22, fontWeight: "bold", fill: accent
      });

      const mainTitle = new fabric.IText(cfg.title, {
        left: 120, top: 460, fontFamily: "Montserrat", fontSize: 36, fontWeight: "bold", fill: textMain
      });

      const subBox = new fabric.Rect({
        left: 80, top: 560, width: 640, height: 110, fill: accent + "18", stroke: accent, strokeWidth: 2, rx: 16, ry: 16
      });

      const subText = new fabric.IText(cfg.sub, {
        left: 110, top: 595, fontFamily: "Inter", fontSize: 18, fontWeight: "bold", fill: textMain
      });

      const ctaRect = new fabric.Rect({
        left: 180, top: 760, width: 440, height: 68, fill: accent, rx: 20, ry: 20
      });

      const ctaText = new fabric.IText(cfg.cta, {
        left: 240, top: 782, fontFamily: "Montserrat", fontSize: 20, fontWeight: "bold", fill: "#ffffff"
      });

      fCanvas.add(topBar, topBarText, iconCircle, iconText, brandText, mainTitle, subBox, subText, ctaRect, ctaText);
      topBarText.centerH();
      iconCircle.centerH();
      iconText.centerH();
      brandText.centerH();
      mainTitle.centerH();
      subBox.centerH();
      subText.centerH();
      ctaRect.centerH();
      ctaText.centerH();
      fCanvas.renderAll();
      if (typeof window.updateCanvasResponsiveScale === "function") {
        window.updateCanvasResponsiveScale();
      }
    }

    const dimsDisplay = document.getElementById("canvasDimsDisplay");
    if (dimsDisplay) dimsDisplay.textContent = `${fCanvas.width} × ${fCanvas.height} px`;

    const typeNames = { logo: "Logotipo", banner: "Banner", post: "Post de Redes", publicidad: "Anuncio Publicitario" };
    if (typeof window.showDmdToast === "function") {
      window.showDmdToast("Cargado en el Lienzo", `El diseño (${typeNames[cfg.type] || 'Gráfico'}) de "${cfg.brand}" ya es editable en el Estudio Canva.`, "success");
    }

    if (scrollIntoCanvas) {
      const studioEl = document.getElementById("estudio-canva");
      if (studioEl) studioEl.scrollIntoView({ behavior: "smooth" });
    }
  }

  function downloadCurrentAsPNG() {
    if (!currentGraphicSVG || !currentGraphicConfig) return;
    let w = 1600;
    let h = 1000;
    if (currentGraphicConfig.type === "banner") {
      w = 1800; h = 900;
    } else if (currentGraphicConfig.type === "post") {
      w = 1600; h = 1600;
    } else if (currentGraphicConfig.type === "publicidad") {
      w = 1600; h = 2000;
    }

    const img = new Image();
    const svgBlob = new Blob([currentGraphicSVG], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = w;
      offCanvas.height = h;
      const ctx = offCanvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);

      const pngUrl = offCanvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `${currentGraphicConfig.type}-${currentGraphicConfig.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
      a.click();
    };
    img.src = url;
  }

  function downloadCurrentAsSVG() {
    if (!currentGraphicSVG || !currentGraphicConfig) return;
    const blob = new Blob([currentGraphicSVG], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentGraphicConfig.type}-${currentGraphicConfig.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`;
    a.click();
  }

  async function runCanvaGraphicGeneration(promptText, presetObj) {
    const promptInput = document.getElementById("canvaIaPrompt");
    const typeSelect = document.getElementById("canvaIaType");
    const colorInput = document.getElementById("canvaIaColor");
    const styleSelect = document.getElementById("canvaIaStyle");
    const chatBox = document.getElementById("canvaIaChat");
    const stageBox = document.getElementById("canvaIaStage");

    const trimmed = (promptText || "").trim();
    if (!trimmed) {
      if (promptInput) promptInput.focus();
      return;
    }

    // Comprobación de Suscripción DMD IA Premium
    if (trimmed !== GRAPHIC_PRESETS["⭐ Plantillas de Logotipos de Marca (20 Diseños)"][0].prompt && typeof window.checkCanGenerateAi === "function") {
      if (!window.checkCanGenerateAi("generar o rediseñar logotipos y banners")) {
        return;
      }
    }

    if (presetObj) {
      if (typeSelect) typeSelect.value = presetObj.type;
      if (colorInput && presetObj.accent) colorInput.value = presetObj.accent;
      if (styleSelect) styleSelect.value = presetObj.dark ? "oscuro" : "claro";
    }

    const forcedType = presetObj ? presetObj.type : (typeSelect ? typeSelect.value : "");
    const chosenColor = (presetObj && presetObj.accent) || (colorInput ? colorInput.value : "#2563eb");
    const chosenStyle = presetObj ? (presetObj.dark ? "oscuro" : "claro") : (styleSelect ? styleSelect.value : "oscuro");

    if (chatBox) {
      const userDiv = document.createElement("div");
      userDiv.className = "aib-msg aib-msg-user";
      userDiv.textContent = trimmed;
      chatBox.appendChild(userDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    let cfg = parsePromptToGraphicConfig(trimmed, forcedType, chosenColor, chosenStyle, presetObj);
    // IA REAL (Groq vía backend del builder): títulos, eslóganes, CTA y
    // color de acento generados de verdad. Sin preset: se pide a Groq y
    // se fusiona con la config local; si no responde, queda lo local.
    if (!presetObj && window.DMD_AI) {
      if (chatBox) {
        const waitDiv = document.createElement("div");
        waitDiv.className = "aib-msg aib-msg-bot";
        waitDiv.id = "canvaAiWait";
        waitDiv.textContent = "✦ Generando textos con IA real (Groq)...";
        chatBox.appendChild(waitDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
      }
      try {
        const aiPrompt = 'Para un diseño tipo ' + (forcedType || 'logo') + ' de un negocio descrito así: "' + trimmed +
          '", estilo ' + chosenStyle + ', devuelve un JSON con estas claves exactas: ' +
          '{"title": "título corto del diseño en mayúsculas", "sub": "eslogan corto en mayúsculas", ' +
          '"cta": "llamada a la acción corta", "badge": "etiqueta corta en mayúsculas", "accent": "color hex de acento"}.';
        const ai = await window.DMD_AI.generateText(aiPrompt, 'canva');
        if (ai) {
          if (typeof ai.title === 'string' && ai.title.trim()) cfg.title = ai.title.trim().toUpperCase().slice(0, 48);
          if (typeof ai.sub === 'string' && ai.sub.trim()) cfg.sub = ai.sub.trim().toUpperCase().slice(0, 60);
          if (typeof ai.cta === 'string' && ai.cta.trim()) cfg.cta = ai.cta.trim().slice(0, 40);
          if (typeof ai.badge === 'string' && ai.badge.trim()) cfg.badge = ai.badge.trim().toUpperCase().slice(0, 30);
          if (typeof ai.accent === 'string' && /^#[0-9a-fA-F]{6}$/.test(ai.accent.trim())) cfg.accent = ai.accent.trim();
        }
      } catch (e) { /* queda la config local */ }
      const w = document.getElementById("canvaAiWait");
      if (w && w.parentNode) w.parentNode.removeChild(w);
    }
    currentGraphicConfig = cfg;
    currentGraphicSVG = buildSVGForGraphic(cfg);

    if (stageBox) {
      let maxWidth = "640px";
      if (cfg.type === "banner") maxWidth = "760px";
      else if (cfg.type === "post") maxWidth = "520px";
      else if (cfg.type === "publicidad") maxWidth = "480px";

      stageBox.innerHTML = `
        <div style="width:100%; max-width:${maxWidth}; border-radius:20px; overflow:hidden; box-shadow:0 20px 50px rgba(15,23,42,0.22); border:2px solid #e2e8f0; background:#fff; transition:transform 0.3s ease;">
          ${currentGraphicSVG}
        </div>
      `;
    }

    // Sincronizar automáticamente en el lienzo de Fabric.js de abajo
    sendGraphicToFabricCanvas(cfg, false);

    if (chatBox) {
      const typeLabels = { logo: "Logotipo de Marca", banner: "Banner Web", post: "Post para Redes Sociales", publicidad: "Anuncio Publicitario" };
      const botDiv = document.createElement("div");
      botDiv.className = "aib-msg aib-msg-bot";
      botDiv.innerHTML = `✅ <strong>¡${typeLabels[cfg.type] || 'Diseño'} generado con IA real (Groq)!</strong> Ya lo cargué también en el lienzo editable de abajo por si deseas personalizar figuras o textos.`;
      chatBox.appendChild(botDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    if (typeof window.saveDmdAiCreation === "function" && promptText && promptText !== GRAPHIC_PRESETS["⭐ Plantillas de Logotipos de Marca (20 Diseños)"][0].prompt) {
      window.saveDmdAiCreation({
        type: cfg.type || "logo",
        title: `${cfg.type === "banner" ? "Banner" : "Logo"}: ${cfg.brand}`,
        prompt: trimmed,
        accent: cfg.accent,
        model: cfg.type === "banner" ? "Canva Studio IA (Banner Studio Pro)" : "Canva Studio IA (Vector Logo Generator)",
        downloadType: "PNG / SVG",
        source: "canva.html"
      });
    }

    // Descontar crédito de idea si está en plan libre
    if (trimmed !== GRAPHIC_PRESETS["⭐ Plantillas de Logotipos de Marca (20 Diseños)"][0].prompt && typeof window.consumeAiGenerationCredit === "function") {
      window.consumeAiGenerationCredit("generar diseño");
    }
  }

  function renderCanvaGraphicGallery() {
    const container = document.getElementById("canvaGalleryContainer");
    if (!container) return;

    container.innerHTML = "";
    container.style.cssText = "display: flex; flex-direction: column; gap: 44px; width: 100%; box-sizing: border-box;";

    for (const [categoryTitle, items] of Object.entries(GRAPHIC_PRESETS)) {
      const catSection = document.createElement("div");
      catSection.style.cssText = "display: flex; flex-direction: column; gap: 20px; width: 100%; box-sizing: border-box;";

      catSection.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; border-left: 5px solid #2563eb; padding-left: 15px;">
          <strong style="font-size:1.05rem; color:#0f172a; text-transform:uppercase; letter-spacing:1.2px; font-weight:900;">${escapeXML(categoryTitle)}</strong>
          <span style="font-size:0.8rem; color:#64748b; font-weight:600;">Pasa el mouse sobre cualquier diseño para agrandarlo y haz clic para editarlo en el lienzo o descargarlo</span>
        </div>
      `;

      const grid = document.createElement("div");
      grid.className = "canva-gallery-grid";
      grid.style.cssText = "display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; width: 100%; box-sizing: border-box;";

      // Mostrar primero las plantillas GRATIS y después las PRO/Premium
      const sortedItems = [...items].sort((a, b) => (a.isPremium ? 1 : 0) - (b.isPremium ? 1 : 0));

      sortedItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "canva-gallery-card";
        card.style.cssText = "cursor: pointer; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; gap: 6px; position: relative; z-index: 1; contain: content; min-width: 0; width: 100%; box-sizing: border-box;";

        const svgMarkup = buildSVGForGraphic(item);

        let aspectRatio = "16/10";
        let typeBadge = "LOGOTIPO";
        if (item.type === "banner") { aspectRatio = "2/1"; typeBadge = "BANNER"; }
        else if (item.type === "post") { aspectRatio = "2/1"; typeBadge = "POST REDES"; }
        else if (item.type === "publicidad") { aspectRatio = "2/1"; typeBadge = "PUBLICIDAD"; }

        card.innerHTML = `
          <div class="canva-tpl-box" style="width:100%; aspect-ratio:${aspectRatio}; border-radius:12px; overflow:hidden; border:2px solid ${item.isPremium ? '#f59e0b' : '#cbd5e1'}; box-shadow:0 6px 16px rgba(15,23,42,0.08); background:${item.dark ? '#0b0f19' : '#ffffff'}; position:relative; transition:border-color 0.25s ease, box-shadow 0.25s ease; display:flex; align-items:center; justify-content:center;">
            ${svgMarkup}
            <div class="canva-tpl-overlay" style="position:absolute; left:0; right:0; bottom:0; padding:6px 10px; background:linear-gradient(to top, rgba(15,23,42,0.92), transparent); display:flex; align-items:center; justify-content:space-between; opacity:0; transition:opacity 0.22s ease;">
              <span style="font-size:0.7rem; font-weight:800; color:#fff;">${item.isPremium ? '🔒 Exclusivo' : '🎨 Clic para editar'}</span>
              <span style="font-size:0.65rem; font-weight:800; background:${item.isPremium ? '#f59e0b' : item.accent}; color:${item.isPremium ? '#78350f' : '#fff'}; padding:2px 8px; border-radius:99px;">${item.isPremium ? '⭐ PRO' : 'Usar'}</span>
            </div>
          </div>
          <div class="canva-tpl-info" style="display:flex; align-items:center; justify-content:space-between; padding:0 2px; gap:4px; width:100%; min-width:0; box-sizing:border-box;">
            <span class="canva-tpl-title" style="font-size:0.8rem; font-weight:800; color:#0f172a; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; min-width:0; flex:1 1 auto;">${escapeXML(item.label)}</span>
            <div style="display:flex; gap:3px; align-items:center; flex-shrink:0;">
              ${item.isPremium ? '<span style="font-size:0.6rem; font-weight:900; background:#f59e0b; color:#78350f; padding:1px 5px; border-radius:4px;">⭐ PRO</span>' : ''}
              <span class="canva-tpl-badge" style="font-size:0.65rem; font-weight:800; color:${item.accent}; background:${item.accent}18; padding:2px 6px; border-radius:99px; white-space:nowrap;">${typeBadge}</span>
            </div>
          </div>
        `;

        const box = card.querySelector(".canva-tpl-box");
        const overlay = card.querySelector(".canva-tpl-overlay");

        card.onmouseenter = () => {
          card.style.zIndex = "30";
          card.style.transform = "scale(1.16) translateY(-6px)";
          if (box) {
            box.style.borderColor = item.isPremium ? "#f59e0b" : item.accent;
            box.style.boxShadow = "0 20px 40px -10px rgba(15,23,42,0.35)";
          }
          if (overlay) overlay.style.opacity = "1";
        };

        card.onmouseleave = () => {
          card.style.zIndex = "1";
          card.style.transform = "scale(1) translateY(0)";
          if (box) {
            box.style.borderColor = item.isPremium ? "#f59e0b" : "#cbd5e1";
            box.style.boxShadow = "0 6px 16px rgba(15,23,42,0.08)";
          }
          if (overlay) overlay.style.opacity = "0";
        };

        card.onclick = () => {
          if (item.isPremium && typeof window.checkTemplateAccess === "function") {
            if (!window.checkTemplateAccess(true, `${item.brand} (${item.label})`)) return;
          }
          const promptInput = document.getElementById("canvaIaPrompt");
          if (promptInput) promptInput.value = item.prompt;
          runCanvaGraphicGeneration(item.prompt, item);
          const aiSection = document.getElementById("canva-ia-section");
          if (aiSection) aiSection.scrollIntoView({ behavior: "smooth" });
        };

        grid.appendChild(card);
      });

      catSection.appendChild(grid);
      container.appendChild(catSection);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderCanvaGraphicGallery();

    const form = document.getElementById("canvaIaForm");
    const promptInput = document.getElementById("canvaIaPrompt");
    const chipsWrap = document.getElementById("canvaIaChips");
    const btnDownloadPng = document.getElementById("btnCanvaIaPng");
    const btnDownloadSvg = document.getElementById("btnCanvaIaSvg");
    const btnEditInCanvas = document.getElementById("btnCanvaIaEditCanvas");

    if (form && promptInput) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        runCanvaGraphicGeneration(promptInput.value);
      });
    }

    if (chipsWrap) {
      chipsWrap.addEventListener("click", function (e) {
        const chip = e.target.closest(".aib-chip");
        if (!chip) return;
        const p = chip.getAttribute("data-prompt") || chip.textContent;
        const t = chip.getAttribute("data-type") || "";
        const typeSelect = document.getElementById("canvaIaType");
        if (typeSelect && t) typeSelect.value = t;
        if (promptInput) promptInput.value = p;
        runCanvaGraphicGeneration(p);
      });
    }

    if (btnDownloadPng) {
      btnDownloadPng.addEventListener("click", () => {
        if (!currentGraphicSVG) return alert("Primero genera o selecciona un diseño.");
        downloadCurrentAsPNG();
      });
    }

    if (btnDownloadSvg) {
      btnDownloadSvg.addEventListener("click", () => {
        if (!currentGraphicSVG) return alert("Primero genera o selecciona un diseño.");
        downloadCurrentAsSVG();
      });
    }

    if (btnEditInCanvas) {
      btnEditInCanvas.addEventListener("click", () => {
        if (!currentGraphicConfig) return alert("Primero genera o selecciona un diseño.");
        sendGraphicToFabricCanvas(currentGraphicConfig, true);
      });
    }

    // Generar un diseño de muestra inicial al cargar la página
    runCanvaGraphicGeneration(GRAPHIC_PRESETS["⭐ Plantillas de Logotipos de Marca (20 Diseños)"][0].prompt, GRAPHIC_PRESETS["⭐ Plantillas de Logotipos de Marca (20 Diseños)"][0]);
  });
})();
