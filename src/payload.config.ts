import path from "node:path";
import { fileURLToPath } from "node:url";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./collections/Media";
import { Projects } from "./collections/projects/config";
import { Technologies } from "./collections/Technologies";
import { Users } from "./collections/Users";
import { env } from "./env";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Media, Projects, Technologies],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: vercelPostgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL || "",
		},
	}),
	sharp,
	plugins: [
		vercelBlobStorage({
			enabled: true, // Optional, defaults to true
			// Specify which collections should use Vercel Blob
			collections: {
				media: true,
			},
			// Token provided by Vercel once Blob storage is added to your Vercel project
			token: env.BLOB_READ_WRITE_TOKEN,
		}),
	],
	localization: {
		defaultLocale: "ru",
		locales: [
			{ label: "Russian", code: "ru" },
			{ label: "English", code: "en" },
		],
		fallback: true,
	},
	// serverURL: env.NEXT_PUBLIC_VERCEL_URL,
});
