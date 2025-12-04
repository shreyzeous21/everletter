type SystemTemplate = {
  name: string;
  slug: string;
  category: string;
  isPublished: boolean;
  proOnly: boolean;
  thumbnail: string;
  html: string;
  variables: {
    key: string;
    value: string;
  }[];
};

export const systemTemplate: SystemTemplate[] = [
  {
    name: "Newsletter",
    slug: "newsletter",
    category: "Email",
    isPublished: true,
    proOnly: false,
    thumbnail: "/charts.webp",
    html: `
  <!doctype html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <style type="text/tailwindcss">
        @theme {
          --color-primary: #2563eb;
        }
      </style>
      </head>
    <body class="bg-gray-100 p-4 font-sans">
      <div class="mx-auto max-w-xl bg-white shadow">
        
        <!-- Header -->
        <div class="border-b border-gray-200 px-6 py-4">
          <h1 class="text-2xl font-bold text-gray-900">{{companyName}}</h1>
        </div>
  
        <!-- Main Content -->
        <div class="px-6 py-8">
          <h2 class="mb-4 text-xl font-semibold text-gray-900">{{subject}}</h2>
          <p class="mb-4 leading-relaxed text-gray-700">Hi {{firstName}},</p>
          <p class="leading-relaxed text-gray-700">{{message}}</p>
        </div>
  
        <!-- Button (Optional) -->
        <div class="px-6 pb-8">
          <a href="{{buttonLink}}" 
             class="inline-block rounded bg-primary px-6 py-3 font-medium text-white hover:opacity-90">
            {{buttonText}}
          </a>
        </div>
  
        <!-- Footer -->
        <div class="border-t border-gray-200 bg-gray-50 px-6 py-4 text-center text-sm text-gray-600">
          <p>{{companyName}} | <a href="{{unsubscribeLink}}" class="underline">Unsubscribe</a></p>
        </div>
  
      </div>
    </body>
  </html>
  `,
    variables: [
      {
        key: "companyName",
        value: "Company Name",
      },
      {
        key: "firstName",
        value: "First Name",
      },
      {
        key: "subject",
        value: "Subject",
      },
      {
        key: "message",
        value: "Message",
      },
      {
        key: "buttonText",
        value: "Button Text",
      },
      {
        key: "buttonLink",
        value: "Button Link",
      },
      {
        key: "unsubscribeLink",
        value: "Unsubscribe Link",
      },
    ],
  },
];
