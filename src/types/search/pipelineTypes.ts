/**
 * A pipeline component that may produce a result (URL) or return undefined to continue.
 */
export type SearchPipelineStep = (query: string) => string | undefined;

/**
 * A pipeline component that must produce a result (URL) — the final step in the pipeline.
 */
export type SearchPipelineEndStep = (query: string) => string;

/**
 * Optional pipeline step used during pipeline construction.
 * Allows gaps (undefined/null) that may be ignored at runtime.
 */
export type SearchPipelineOptionalStep =
  | SearchPipelineStep
  | undefined
  | null;

/**
 * Union type for any step that can go in a pipeline.
 * Use this when building the pipeline array.
 */
export type SearchPipelinePart = SearchPipelineEndStep | SearchPipelineOptionalStep ;

/**
 * Pipeline array where:
 * - zero or more intermediate steps (SearchPipelineStep | undefined | null)
 * - last step must be a SearchPipelineEndStep
 */
export type SearchPipeline =
  [...(SearchPipelineStep | undefined | null)[], SearchPipelineEndStep];