import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: { kind: "local" },

  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/posts/*/",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        description: fields.text({
          label: "Description",
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: "Publish Date",
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          label: "Draft",
          defaultValue: false,
          description: "Draft posts are not visible on the site",
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Agentic Coding", value: "agentic-coding" },
            { label: "Software Engineering", value: "software-engineering" },
            { label: "Career", value: "career" },
            { label: "Tools & Workflow", value: "tools" },
            { label: "Thoughts", value: "thoughts" },
          ],
          defaultValue: "software-engineering",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/posts",
          publicPath: "/images/posts",
        }),
        content: fields.markdoc({
          label: "Content",
        }),
      },
    }),

    projects: collection({
      label: "Projects",
      slugField: "name",
      path: "content/projects/*",
      format: { data: "yaml" },
      schema: {
        name: fields.slug({
          name: { label: "Project Name", validation: { isRequired: true } },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        url: fields.url({ label: "Live URL" }),
        github: fields.url({ label: "GitHub URL" }),
        techStack: fields.array(fields.text({ label: "Technology" }), {
          label: "Tech Stack",
          itemLabel: (props) => props.value,
        }),
        image: fields.image({
          label: "Screenshot",
          directory: "public/images/projects",
          publicPath: "/images/projects",
        }),
        featured: fields.checkbox({
          label: "Featured",
          defaultValue: false,
        }),
        sortOrder: fields.integer({
          label: "Sort Order",
          defaultValue: 0,
        }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: "Site Settings",
      path: "content/settings",
      format: { data: "yaml" },
      schema: {
        siteTitle: fields.text({
          label: "Site Title",
          validation: { isRequired: true },
        }),
        siteDescription: fields.text({
          label: "Site Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        siteUrl: fields.url({
          label: "Site URL",
          validation: { isRequired: true },
        }),
        newsletterUrl: fields.url({ label: "Buttondown Newsletter URL" }),
        socialLinks: fields.object({
          github: fields.url({ label: "GitHub" }),
          linkedin: fields.url({ label: "LinkedIn" }),
          twitter: fields.url({ label: "Twitter / X" }),
          bluesky: fields.url({ label: "Bluesky" }),
          email: fields.text({ label: "Email Address" }),
        }),
      },
    }),

    author: singleton({
      label: "Author",
      path: "content/author",
      format: { data: "yaml" },
      schema: {
        name: fields.text({
          label: "Name",
          validation: { isRequired: true },
        }),
        bio: fields.text({
          label: "Bio",
          multiline: true,
          validation: { isRequired: true },
        }),
        shortBio: fields.text({
          label: "Short Bio (one line)",
          validation: { isRequired: true },
        }),
        avatar: fields.image({
          label: "Avatar",
          directory: "public/images",
          publicPath: "/images",
        }),
        role: fields.text({ label: "Current Role / Title" }),
        company: fields.text({ label: "Company" }),
        companyUrl: fields.url({ label: "Company URL" }),
        location: fields.text({ label: "Location" }),
      },
    }),
  },
});
