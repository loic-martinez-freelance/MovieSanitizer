interface MovieDetail {
  year: string
  genre: string
  duration: string
  filename: string
  size: string
  description: string
  poster?: string
}

interface MovieDetailsProps {
  title: string
  details: MovieDetail
}

export const MovieDetails = ({ title, details }: MovieDetailsProps) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <div className="aspect-[2/3] bg-muted rounded-lg flex items-center justify-center text-6xl">
              <img src={details.poster}></img>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-muted-foreground">Year</div>
                <div>{details.year}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Genre</div>
                <div>{details.genre}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Duration</div>
                <div>{details.duration}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">File</div>
                <div className="truncate">{details.filename}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Size</div>
                <div>{details.size}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                Description
              </div>
              <div className="text-sm leading-relaxed">
                {details.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
