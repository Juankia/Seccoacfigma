# 🔌 Ejemplo de Integración con WordPress

## Estructura de archivos en tu proyecto Next.js

```
tu-proyecto-nextjs/
├── src/
│   ├── app/
│   │   ├── page.tsx                    ← Página de inicio (Server Component)
│   │   ├── layout.tsx                  ← Layout principal
│   │   ├── ahorros/
│   │   │   └── page.tsx               ← Lista de productos de ahorro
│   │   └── creditos/
│   │       └── page.tsx               ← Lista de créditos
│   ├── components/
│   │   ├── home/
│   │   │   ├── Hero.tsx               ← 'use client' (animaciones)
│   │   │   ├── QuickAccess.tsx        ← 'use client' (animaciones)
│   │   │   ├── FeaturedProducts.tsx   ← 'use client'
│   │   │   ├── Benefits.tsx           ← 'use client' (animaciones)
│   │   │   └── CtaBanner.tsx          ← 'use client' (animaciones)
│   │   ├── layout/
│   │   │   └── Navbar.tsx             ← 'use client' (hooks: useState)
│   │   └── products/
│   │       └── ProductCard.tsx        ← 'use client' (animaciones)
│   └── lib/
│       └── cms/
│           └── wordpress-client.ts     ← Funciones para fetch de WP
```

---

## 📝 Ejemplo 1: Página de Inicio con datos de WordPress

### `/src/app/page.tsx` (Server Component)

```typescript
import { getCustomizerSettings, getSavingsProducts, getCreditProducts } from '@/lib/cms/wordpress-client';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { QuickAccess } from '@/components/home/QuickAccess';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Benefits } from '@/components/home/Benefits';
import { CtaBanner } from '@/components/home/CtaBanner';

export const revalidate = 60; // ISR: Revalidar cada 60 segundos

export default async function HomePage() {
  // Fetch paralelo de todos los datos desde WordPress
  const [settings, savingsProducts, creditProducts] = await Promise.all([
    getCustomizerSettings(),
    getSavingsProducts(),
    getCreditProducts(),
  ]);

  // Filtrar solo productos destacados
  const featuredSavings = savingsProducts?.filter(p => p.isFeatured).slice(0, 3);
  const featuredCredits = creditProducts?.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar con datos de WordPress */}
      <Navbar
        logo={settings?.logo}
        shortName={settings?.shortName || 'SEC COAC'}
        phone={settings?.phone || '(07) 283-4567'}
        email={settings?.email || 'info@seccoac.fin.ec'}
        sepsCode={settings?.sepsCode || 'SEPS-ROEPS-2023-0001234'}
        primaryColor={settings?.primaryColor || '#166534'}
      />
      
      <main className="flex-1">
        {/* Hero con datos de WordPress */}
        <Hero
          title={settings?.heroTitle || 'Tu cooperativa, tu confianza'}
          subtitle={settings?.heroSubtitle || 'Más de 25 años construyendo sueños con nuestra comunidad.'}
          ctaText={settings?.heroCtaText || 'Hazte socio'}
          ctaUrl={settings?.heroCtaUrl || '/nosotros'}
          primaryColor={settings?.primaryColor || '#166534'}
          heroImage={settings?.heroImage}
          stats={settings?.stats || [
            { number: '45,000+', label: 'Socios activos' },
            { number: '25+', label: 'Años de servicio' },
            { number: '5', label: 'Agencias en Cuenca' },
            { number: 'A+', label: 'Calificación de riesgo' },
          ]}
        />
        
        {/* QuickAccess - Sin datos de WP (por ahora) */}
        <QuickAccess />
        
        {/* FeaturedProducts con datos de WordPress */}
        <FeaturedProducts 
          savingsProducts={featuredSavings}
          creditProducts={featuredCredits}
        />
        
        {/* Benefits - Sin datos de WP (por ahora) */}
        <Benefits />
        
        {/* CTA Banner - Sin datos de WP (por ahora) */}
        <CtaBanner />
      </main>
    </div>
  );
}

// Metadata para SEO (opcional)
export async function generateMetadata() {
  const settings = await getCustomizerSettings();
  
  return {
    title: `${settings?.institutionName || 'SEC COAC'} - Tu cooperativa de confianza`,
    description: settings?.heroSubtitle || 'Cooperativa de Ahorro y Crédito',
  };
}
```

---

## 📝 Ejemplo 2: Página de Productos de Ahorro

### `/src/app/ahorros/page.tsx`

```typescript
import { getSavingsProducts } from '@/lib/cms/wordpress-client';
import { ProductCard } from '@/components/products/ProductCard';

export const revalidate = 60;

export default async function AhorrosPage() {
  const products = await getSavingsProducts();

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Productos de Ahorro</h1>
        <p className="text-gray-600">No hay productos disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Productos de Ahorro
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Opciones seguras y rentables para cada etapa de tu vida.
        </p>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            basePath="/ahorros" 
          />
        ))}
      </div>
    </div>
  );
}
```

---

## 📝 Ejemplo 3: Configuración de WordPress Customizer

### Backend WordPress - Campos ACF necesarios

```php
// functions.php en tu tema de WordPress

// Endpoint personalizado para configuración del sitio
add_action('rest_api_init', function () {
  register_rest_route('coopdigital/v1', '/customizer', [
    'methods' => 'GET',
    'callback' => 'get_customizer_settings',
    'permission_callback' => '__return_true'
  ]);
});

function get_customizer_settings() {
  return [
    // Branding
    'logo' => get_theme_mod('custom_logo_url', ''),
    'favicon' => get_site_icon_url(),
    'institutionName' => get_option('site_institution_name', 'SEC COAC'),
    'shortName' => get_option('site_short_name', 'SEC COAC'),
    'sepsCode' => get_option('site_seps_code', 'SEPS-ROEPS-2023-0001234'),
    
    // Colores
    'primaryColor' => get_theme_mod('primary_color', '#166534'),
    'secondaryColor' => get_theme_mod('secondary_color', '#003848'),
    'accentColor' => get_theme_mod('accent_color', '#ca9f43'),
    'darkColor' => get_theme_mod('dark_color', '#1a1a1a'),
    
    // Hero Section
    'heroTitle' => get_option('hero_title', 'Tu cooperativa, tu confianza'),
    'heroSubtitle' => get_option('hero_subtitle', 'Más de 25 años construyendo sueños con nuestra comunidad.'),
    'heroCtaText' => get_option('hero_cta_text', 'Hazte socio'),
    'heroCtaUrl' => get_option('hero_cta_url', '/nosotros'),
    'heroImage' => get_option('hero_image_url', ''),
    'stats' => json_decode(get_option('hero_stats', '[]'), true),
    
    // Contacto
    'phone' => get_option('contact_phone', '(07) 283-4567'),
    'whatsapp' => get_option('contact_whatsapp', ''),
    'email' => get_option('contact_email', 'info@seccoac.fin.ec'),
    'address' => get_option('contact_address', ''),
    
    // Social
    'socialLinks' => [
      'facebook' => get_option('social_facebook', ''),
      'instagram' => get_option('social_instagram', ''),
      'twitter' => get_option('social_twitter', ''),
      'linkedin' => get_option('social_linkedin', ''),
    ],
    
    // About
    'mission' => get_option('about_mission', ''),
    'vision' => get_option('about_vision', ''),
    'history' => get_option('about_history', ''),
    'values' => json_decode(get_option('about_values', '[]'), true),
    
    // Footer
    'footerText' => get_option('footer_text', ''),
  ];
}
```

---

## 📝 Ejemplo 4: Custom Post Type para Productos

### Backend WordPress - CPT "Productos de Ahorro"

```php
// functions.php

// Registrar CPT: Productos de Ahorro
function register_savings_product_cpt() {
  $labels = [
    'name' => 'Productos de Ahorro',
    'singular_name' => 'Producto de Ahorro',
    'add_new' => 'Agregar Nuevo',
    'add_new_item' => 'Agregar Nuevo Producto',
    'edit_item' => 'Editar Producto',
    'view_item' => 'Ver Producto',
  ];

  $args = [
    'labels' => $labels,
    'public' => true,
    'has_archive' => true,
    'show_in_rest' => true, // ← IMPORTANTE para REST API
    'menu_icon' => 'dashicons-money-alt',
    'supports' => ['title', 'editor', 'custom-fields'],
    'rewrite' => ['slug' => 'ahorros'],
  ];

  register_post_type('savings_product', $args);
}
add_action('init', 'register_savings_product_cpt');

// ACF Fields para Productos de Ahorro
if (function_exists('acf_add_local_field_group')) {
  acf_add_local_field_group([
    'key' => 'group_savings_product',
    'title' => 'Detalles del Producto',
    'fields' => [
      [
        'key' => 'field_short_description',
        'label' => 'Descripción Corta',
        'name' => 'short_description',
        'type' => 'textarea',
        'rows' => 3,
      ],
      [
        'key' => 'field_benefits',
        'label' => 'Beneficios',
        'name' => 'benefits',
        'type' => 'textarea',
        'instructions' => 'Un beneficio por línea',
      ],
      [
        'key' => 'field_requirements',
        'label' => 'Requisitos',
        'name' => 'requirements',
        'type' => 'textarea',
        'instructions' => 'Un requisito por línea',
      ],
      [
        'key' => 'field_reference_rate',
        'label' => 'Tasa Referencial (%)',
        'name' => 'reference_rate',
        'type' => 'number',
        'step' => 0.1,
      ],
      [
        'key' => 'field_min_amount',
        'label' => 'Monto Mínimo',
        'name' => 'min_amount',
        'type' => 'number',
      ],
      [
        'key' => 'field_icon',
        'label' => 'Icono',
        'name' => 'icon',
        'type' => 'select',
        'choices' => [
          'Wallet' => 'Wallet (Billetera)',
          'PiggyBank' => 'PiggyBank (Alcancía)',
          'Baby' => 'Baby (Bebé)',
          'TrendingUp' => 'TrendingUp (Inversión)',
        ],
      ],
      [
        'key' => 'field_is_featured',
        'label' => '¿Destacado en Home?',
        'name' => 'is_featured',
        'type' => 'true_false',
        'default_value' => 0,
      ],
      [
        'key' => 'field_cta_label',
        'label' => 'Texto del Botón',
        'name' => 'cta_label',
        'type' => 'text',
        'default_value' => 'Ver detalles',
      ],
      [
        'key' => 'field_sort_order',
        'label' => 'Orden',
        'name' => 'sort_order',
        'type' => 'number',
        'default_value' => 0,
      ],
    ],
    'location' => [
      [
        [
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'savings_product',
        ],
      ],
    ],
  ]);
}
```

---

## 📝 Ejemplo 5: Client Component vs Server Component

### ❌ INCORRECTO: Intentar usar datos de WordPress en Client Component

```typescript
// ❌ NO HACER ESTO
'use client';

import { useEffect, useState } from 'react';
import { getCustomizerSettings } from '@/lib/cms/wordpress-client';

export function Hero() {
  const [settings, setSettings] = useState(null);
  
  useEffect(() => {
    // ❌ Esto NO funciona porque getCustomizerSettings usa fetch con ISR
    getCustomizerSettings().then(setSettings);
  }, []);
  
  return <div>{settings?.heroTitle}</div>;
}
```

### ✅ CORRECTO: Pasar datos desde Server Component

```typescript
// ✅ Server Component (page.tsx)
import { getCustomizerSettings } from '@/lib/cms/wordpress-client';
import { Hero } from '@/components/home/Hero';

export default async function HomePage() {
  const settings = await getCustomizerSettings();
  
  return <Hero title={settings?.heroTitle} />;
}

// ✅ Client Component (Hero.tsx)
'use client';

interface HeroProps {
  title?: string;
}

export function Hero({ title }: HeroProps) {
  return <div>{title}</div>;
}
```

---

## 🔄 Flujo de Datos: WordPress → Next.js

```
WordPress CMS
    ↓
  REST API (/wp-json/...)
    ↓
wordpress-client.ts (fetch con ISR)
    ↓
Server Component (page.tsx)
    ↓
Props ↓
    ↓
Client Component (Hero.tsx, Navbar.tsx, etc.)
    ↓
  UI renderizado con animaciones
```

---

## 🚀 Variables de Entorno

### `.env.local` en tu proyecto Next.js

```env
# WordPress API
NEXT_PUBLIC_WP_API_URL=https://cmswebdemo.skillsoft.ec/cms/wp-json

# Si necesitas autenticación para ciertas rutas
WP_AUTH_USER=admin
WP_AUTH_PASSWORD=tu_contraseña_app
```

---

## ✅ Checklist de Integración

- [ ] Crear Custom Post Types en WordPress (savings_product, credit_product)
- [ ] Configurar ACF Fields para cada CPT
- [ ] Crear endpoint personalizado `/coopdigital/v1/customizer`
- [ ] Habilitar REST API en WordPress (`show_in_rest: true`)
- [ ] Configurar CORS si es necesario
- [ ] Copiar `wordpress-client.ts` a tu proyecto Next.js
- [ ] Configurar `.env.local` con `NEXT_PUBLIC_WP_API_URL`
- [ ] Verificar que el fetch funcione (test en Postman o navegador)
- [ ] Integrar componentes con datos de WP
- [ ] Probar ISR (Incremental Static Regeneration)
- [ ] Deploy a producción

---

## 🎯 Resultado Final

Con esta integración tendrás:

✅ **CMS WordPress** → Administradores gestionan contenido  
✅ **Next.js Frontend** → UI moderna con animaciones  
✅ **ISR** → Contenido actualizado automáticamente cada 60 segundos  
✅ **Performance** → SSG + caching inteligente  
✅ **Flexibilidad** → Cambios en WP se reflejan en el sitio sin rebuild

**Todo listo para producción. 🚀**
