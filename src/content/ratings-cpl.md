The Rating is listed at **//RatingList//Rating[n]**[^1][^2]

    <CompositionPlaylist xmlns=”http://www.smpte-ra.org/schemas/429-7/2006/CPL”>
      …
      <RatingList>
        …
        <Rating>
          <Agency>http://www.movielabs.com/md/ratings/GB/BBFC/1/12A</Agency>
          <Label>12A</Label>
        </Rating>
        …
      </RatingList>
      …
    </CompositionPlaylist>



[^1]: *Permissible values for ratings are governed by the Agency element, which associates a unique URI with each rating system.  There is no global registry for rating systems, but a reasonable alternative would be to use the [MovieLabs Common Metadata Ratings](http://www.movielabs.com/md/ratings/), which has coverage of most rating systems.*
[^2]: *Note that `13`, `RB`, and `GB` are not permissible MPAA ratings.  The `13` rating would map to `PG-13`.  In the MovieLabs Common Metadata Ratings scheme, `RB` and `RB` can be accommodated by using the Agency URI “<http://www.movielabs.com/md/ratings/US/MPAAT/1>”*