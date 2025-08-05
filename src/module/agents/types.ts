import {inferProcedureOutput}  from "@trpc/server"
import type {AppRouter} from "@/trpc/routers/_aoo"



export type AgentGetOne=inferProcedureOutput<AppRouter["agents"]["getOne"]>

