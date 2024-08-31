import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class SQLInjectionExample {

    public void getUserDetails(String userId) {
        Connection conn = null;
        Statement stmt = null;
        try {
            // Establish a database connection
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydatabase", "user", "password");
            stmt = conn.createStatement();
            
            // Vulnerable SQL query
            String query = "SELECT * FROM users WHERE user_id = '" + userId + "'";
            ResultSet rs = stmt.executeQuery(query);
            
            // Process the results
            while (rs.next()) {
                System.out.println("User: " + rs.getString("username"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
