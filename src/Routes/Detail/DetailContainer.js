import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
   // Constructor class with default states: props get inherited > pathname extracted > this.state created with "isMovie" variable, which contains the pathname from props.
   constructor(props) {
      super(props);
      const {
         location: { pathname },
      } = props;
      this.state = {
         result: null,
         error: null,
         loading: true,
         isMovie: pathname.includes("/movie/"),
      };
   }
   // gets the id from this.props.
   async componentDidMount() {
      const {
         match: {
            params: { id },
         },
         history: { push },
      } = this.props;
      const { isMovie } = this.state;

      // parse id from string to int.
      const parsedId = parseInt(id);
      // check for null.
      if (isNaN(parsedId)) {
         return push("/");
      }
      let result = null;
      try {
         if (isMovie) {
            // Alternative way:
            // const request = await moviesApi.movieDetail(parsedId);
            // result = request.data;
            ({ data: result } = await moviesApi.movieDetail(parsedId));
         } else {
            // Alternative way:
            // const request = await tvApi.showDetail(parsedId);
            // result = request.data;
            ({ data: result } = await tvApi.showDetail(parsedId));
         }
      } catch {
         this.setState({ error: "Can't find anything." });
      } finally {
         this.setState({ loading: false, result });
      }
   }

   render() {
      const { result, result_two, videos, error, loading } = this.state;
      return (
         <DetailPresenter
            result={result}
            result_two={result_two}
            videos={videos}
            error={error}
            loading={loading}
         />
      );
   }
}
