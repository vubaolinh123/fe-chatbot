interface ProgressIndicatorProps {
  currentStep: 1 | 2 | 3;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { number: 1, label: "Lĩnh vực" },
    { number: 2, label: "Trường hợp" },
    { number: 3, label: "Chi tiết" },
  ];

  return (
    <div className="border-b border-slate-200 bg-white px-4 py-6">
      <div className="mx-auto flex max-w-4xl items-center justify-center gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center gap-4">
            {/* Step Circle */}
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all ${
                step.number <= currentStep
                  ? "bg-red-600 text-white"
                  : "border-2 border-slate-300 text-slate-600"
              }`}
            >
              {step.number}
            </div>

            {/* Step Label */}
            <span
              className={`text-sm font-medium transition-colors ${
                step.number <= currentStep
                  ? "text-slate-900"
                  : "text-slate-500"
              }`}
            >
              {step.label}
            </span>

            {/* Divider */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-12 transition-colors ${
                  step.number < currentStep
                    ? "bg-red-600"
                    : "bg-slate-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

