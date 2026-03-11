import type {
	SearchPipelineEndStep,
	SearchPipeline,
	SearchPipelineOptionalStep
} from '$types/search/pipelineTypes';

export class Pipeline {
	private constructor(private steps: SearchPipeline) {}

	run(query: string) {
		for (const step of this.steps) {
			if (!step) continue;

			const result = step(query);
			if (result) {
				window.location.href = result;
				return;
			}
		}
	}

	static Builder = class PipelineBuilder {
		private steps: SearchPipelineOptionalStep[] = [];

		appendStep(step: SearchPipelineOptionalStep) {
			this.steps.push(step);
			return this;
		}

		setEndStep(endStep: SearchPipelineEndStep) {
			return new Pipeline.BuildablePipelineBuilder(this.steps, endStep);
		}
	};

	/**
	 * Hidden builder stage that exposes `build()`
	 */
	private static BuildablePipelineBuilder = class {
		constructor(
			private steps: SearchPipelineOptionalStep[],
			private endStep: SearchPipelineEndStep
		) {}

		build(): Pipeline {
			return new Pipeline([...this.steps, this.endStep] as SearchPipeline);
		}
	};
}
