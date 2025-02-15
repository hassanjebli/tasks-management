// GuestLayout.jsx
export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Left Branding Section */}
      <div className="w-full sm:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-700 hidden sm:flex flex-col justify-between p-12 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-24 h-24 bg-white/10 rounded-full -top-12 -left-12 animate-float"></div>
          <div className="absolute w-32 h-32 bg-white/10 rounded-full bottom-20 -right-16 animate-float-delayed"></div>
          <div className="absolute w-16 h-16 bg-white/10 rounded-full top-1/3 left-1/4 animate-float"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8 group">
            <svg
              className="w-14 h-14 text-white transition-transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              TaskFlow Pro
            </h2>
          </div>

          <p className="text-emerald-100 text-lg mb-8 max-w-md leading-relaxed">
            Transform your productivity with AI-powered task management and
            seamless team collaboration.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-emerald-50">Smart Priority Sorting</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <span className="text-emerald-50">Real-time Collaboration</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-emerald-50">Workflow Automation</span>
            </div>
          </div>
        </div>

        {/* Animated footer */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 text-emerald-200">
            <div className="h-px w-16 bg-emerald-300/30"></div>
            <p className="text-sm font-light tracking-wide">
              Trusted by teams at
              <br />
              <span className="font-medium">
                Innovative Companies Worldwide
              </span>
            </p>
          </div>
        </div>

        {/* Add these keyframes to your CSS */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(10deg);
            }
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float 10s ease-in-out infinite 2s;
          }
        `}</style>
      </div>

      {/* Right Form Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
