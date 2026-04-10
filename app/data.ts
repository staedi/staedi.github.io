type ProjectStatus = "Ongoing" | "Completed"

type Project = {
  name: string
  description: string
  stack: string[]
  link?: string
  // video: string
  // id: string
  repo?: string
  status: ProjectStatus
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: "Financial News Explorer Dashboard",
    description:
      "React-vite dashboard for analyzing Financial News with entity graphs, topic modeling, and sentiment analysis across sectors and companies.",
    stack: ["Vite", "TypeScript", "Bun", "spaCy", "BERTopic", "LanceDB"],
    repo: "https://github.com/staedi/sec-edgar-vite",
    link: "https://staedi.github.io/sec-edgar-vite",
    status: "Ongoing",
  },
  {
    name: "Llama 3.2 Fine-tuned Directional Sentiment Analysis model",
    description:
      "LoRA fine-tuning and local inference pipeline for Llama 3.2 3B on Apple Silicon via `mlx-lm`, targeting financial sentiment classification.",
    stack: ["Python", "mlx-lm", "Llama 3.2", "NLP", "Sentiment"],
    repo: "https://github.com/staedi/sentiment-mlx",
    link: "https://huggingface.co/staedi/sentiment-llama-3.2",
    status: "Completed",
  },
  {
    name: "Llama 3.2 Fine-tuned Coreference Resolution model",
    description:
      "LoRA fine-tuning and local inference pipeline for Llama 3.2 3B on Apple Silicon via `mlx-lm`, achieving coreference resolution on the financial texts.",
    stack: ["Python", "mlx-lm", "Llama 3.2", "NLP", "Coreference"],
    repo: "https://github.com/staedi/coref-mlx",
    link: "https://huggingface.co/staedi/coref-llama-3.2",
    status: "Completed",
  },
]

// export const PROJECTS: Project[] = [
//   {
//     name: 'Motion Primitives Pro',
//     description:
//       'Advanced components and templates to craft beautiful websites.',
//     link: 'https://pro.motion-primitives.com/',
//     video:
//       'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
//     id: 'project1',
//   },
//   {
//     name: 'Motion Primitives',
//     description: 'UI kit to make beautiful, animated interfaces.',
//     link: 'https://motion-primitives.com/',
//     video:
//       'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
//     id: 'project2',
//   },
// ]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/staedi',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/minpark',
  },
]

// export const EMAIL = 'your@email.com'
