import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    margin: "15px 10px 10px 10px",
  },
  reportHeader: {
    // margin: "0 auto",
    display: "flex",
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  movieContainer: {
    backgroundColor: "#f6f6f5",
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  movieDetails: {
    display: "flex",
    marginLeft: 5,
  },
  movieTitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  movieOverview: {
    fontSize: 10,
  },

  image: {
    height: 200,
    width: 150,
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    marginBottom: 12,
  },
  vote: {
    display: "flex",
    flexDirection: "row",
  },
  rating: {
    height: 10,
    width: 10,
  },
  vote_text: {
    fontSize: 10,
  },
  vote_pop: {
    fontSize: 10,
    padding: 2,
    backgroundColor: "#61C74F",
    color: "#fff",
  },
  vote_pop_text: {
    fontSize: 10,
    marginLeft: 4,
  },
  overviewContainer: {
    minHeight: 110,
  },
  detailsFooter: {
    display: "flex",
    flexDirection: "row",
  },
  lang: {
    fontSize: 8,
    fontWeight: 700,
  },
  vote_average: {
    fontSize: 8,
    marginLeft: 4,
    fontWeight: "bold",
  },
});

export function PdfDocument(props) {
  const { data } = props;
  console.log("pdf props", props.data);
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.reportHeader}>
          <Text>Penny Mart Supermarket</Text>
          <Text>some phrase about the Supermarket</Text>
        </View>
        <View>
          <Text>Total Product Sold: {data.productCount}</Text>
        </View>
        <View>
          <Text>Total Revene Generated: {data.revenue}</Text>
        </View>
        <View>
          <Text>Total Product Sold: {data.productCount}</Text>
        </View>
        <View>
          <Text>Total Product Sold: {data.productCount}</Text>
        </View>
        {/* {data
          ? data.map((a, index) => {
              return (
                <View key={index} style={styles.movieContainer}>
                  <View style={styles.movieDetails}>
                    <Text style={styles.movieTitle}>{a._id}</Text>
                    <View style={styles.subtitle}>
                      <View style={styles.vote}>
                        <Image source="star.png" style={styles.rating} />
                        <Text style={styles.vote_text}>{a.productName}</Text>
                      </View>
                      <View style={styles.vote}>
                        <Text style={styles.vote_pop}>{a.quantity}</Text>
                        <Text style={styles.vote_pop_text}>Popularity</Text>
                      </View>
                    </View>
                    <View style={styles.overviewContainer}>
                      <Text style={styles.movieOverview}>{a.store}</Text>
                    </View>
                    <View style={styles.detailsFooter}>
                      <Text style={styles.lang}>Language</Text>
                      <Text style={styles.vote_average}>
                        Average Votes: {a.originalPrice}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          : ""} */}
      </Page>
    </Document>
  );
}
