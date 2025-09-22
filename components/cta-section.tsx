import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full text-primary font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Ready to Transform Your Institution?
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-balance leading-tight">
            Start Building Smarter Timetables Today!
          </h2>

          <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto leading-relaxed text-pretty">
            Join hundreds of educational institutions already using EduTimely to create conflict-free, NEP 2020
            compliant timetables with the power of AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-glow"
            >
              Try EduTimely Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 bg-transparent"
            >
              Schedule a Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-secondary-foreground/60 mt-12">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Free 30-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Setup in minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
