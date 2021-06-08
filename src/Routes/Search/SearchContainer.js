import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
   state = {
      movieResults: null,
      tvResults: null,
      searchTerm: "",
      loading: false,
      error: null,
   };

   // Check for a blank form.
   handleSubmit = (event) => {
      event.preventDefault();
      const { searchTerm } = this.state;
      if (searchTerm !== "") {
         this.searchByTerm();
      }
   };

   updateTerm = (event) => {
      const {
         target: { value },
      } = event;
      this.setState({
         searchTerm: value,
      });
   };
   //
   searchByTerm = async () => {
      const { searchTerm } = this.state;
      this.setState({ loading: true });
      try {
         // Use the searchTerm to request for Search API grab the results.
         const {
            data: { results: movieResults },
         } = await moviesApi.search(searchTerm);
         const {
            data: { results: tvResults },
         } = await tvApi.search(searchTerm);

         // Set the State and assign API data to currentState variables.
         this.setState({
            movieResults,
            tvResults,
         });
      } catch {
         this.setState({ error: "Can't find results." });
      } finally {
         this.setState({ loading: false });
      }
   };
   render() {
      const { movieResults, tvResults, searchTerm, loading, error } =
         this.state;
      return (
         <SearchPresenter
            movieResults={movieResults}
            tvResults={tvResults}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            handleSubmit={this.handleSubmit}
         />
      );
   }
}
