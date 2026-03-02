import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        frontend: {
            type: String,
            enum: [
                "React", "Angular", "Vue.js", "Next.js", "Nuxt.js", "Svelte", "SvelteKit",
                "HTML5", "CSS3", "JavaScript", "TypeScript", "Bootstrap", "Tailwind CSS",
                "Material UI", "Chakra UI", "Ant Design", "Sass/SCSS", "Less",
                "Redux", "Zustand", "MobX", "GraphQL", "REST API", "Webpack", "Vite",
                "Gatsby", "Remix", "Ember.js", "Backbone.js", "jQuery", "Three.js",
                "WebGL", "Canvas API", "PWA", "Web Components", "Storybook",
                "Jest", "Cypress", "Playwright", "Testing Library", "Figma", "Framer Motion"
            ]
        },
        database: {
            type: String,
            enum: [
                "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Microsoft SQL Server",
                "Oracle", "MariaDB", "Redis", "Cassandra", "DynamoDB", "Firebase",
                "Supabase", "CouchDB", "Neo4j", "InfluxDB", "Elasticsearch",
                "Firestore", "PlanetScale", "Fauna", "RethinkDB", "Couchbase",
                "TimescaleDB", "Snowflake", "BigQuery", "Redshift", "HBase",
                "Amazon RDS", "Prisma", "Mongoose", "Sequelize", "TypeORM"
            ]
        },
        programmingLanguage: {
            type: String,
            enum: [
                "JavaScript", "TypeScript", "Python", "Java", "C", "C++", "C#",
                "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin", "Scala",
                "R", "MATLAB", "Perl", "Haskell", "Elixir", "Erlang",
                "Clojure", "F#", "Dart", "Lua", "Shell/Bash", "PowerShell",
                "Assembly", "COBOL", "Fortran", "Groovy", "Julia", "Solidity",
                "Objective-C", "Visual Basic", "Ada", "Prolog", "Zig"
            ]
        },
        behaviouralSkills: {
            type: String,
            enum: [
                "Communication", "Teamwork", "Problem Solving", "Critical Thinking",
                "Adaptability", "Time Management", "Leadership", "Creativity",
                "Emotional Intelligence", "Conflict Resolution", "Decision Making",
                "Active Listening", "Attention to Detail", "Work Ethic", "Accountability",
                "Collaboration", "Empathy", "Patience", "Negotiation", "Mentoring",
                "Stress Management", "Self-Motivation", "Open-Mindedness", "Flexibility",
                "Analytical Thinking", "Presentation Skills", "Networking",
                "Project Management", "Customer Focus", "Cultural Awareness",
                "Growth Mindset", "Resilience", "Initiative", "Organizational Skills"
            ]
        }
    },
    { _id: false }
);

export default skillSchema;