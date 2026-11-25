import checker.code.CheckCode3;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Set;
import java.util.TreeSet;
import model.ErrorListReport;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

// Developer verification against an independently installed Freego Dec 19 2025.
// Inputs must be the three post-render browser DOM snapshots, in page order.
// This does not replace a Freego GUI scan or the AA CSS checks.
public class FreegoPracticeCheck {
  static Set<String> failures(Document document) throws Exception {
    var found = new TreeSet<String>();
    for (var rule : CheckCode3.values()) {
      if (!rule.getLevel().toString().equals("A")) continue;
      var report = new ErrorListReport(3);
      rule.createInstance().checkRule(document, report,
          new URI("https://practice.example/test/"), new ArrayList<String>());
      for (var group : report.getHuman()) {
        for (var error : group.getReport()) {
          throw new IllegalStateException("Rule execution error: " + error.getCode() + " " + error.geterrorCode());
        }
      }
      for (var group : report.getMachine()) {
        for (var error : group.getReport()) found.add(error.getCode());
      }
    }
    return found;
  }

  static void require(boolean value, String message) {
    if (!value) throw new IllegalStateException(message);
  }

  public static void main(String[] args) throws Exception {
    require(args.length == 3, "Provide page1.html, page2.html and page3.html captured after React loads.");
    var expected = new ArrayList<Set<String>>();
    expected.add(Set.of("HM1110100C", "HM1110106C", "HM1240401C"));
    expected.add(Set.of("HM1110104C", "HM1240200C", "HM1410201C"));
    expected.add(Set.of("HM1130103C", "HM1130104C", "HM1310100C"));
    for (int i = 0; i < 3; i++) {
      var document = Jsoup.parse(Files.readString(Path.of(args[i])));
      var actual = failures(document);
      require(actual.equals(expected.get(i)), "Unexpected page " + (i + 1) + " codes: " + actual);
      System.out.println("Page " + (i + 1) + " verified: " + actual);
      var fixed = document.clone();
      if (i == 0) {
        fixed.getElementById("practice-poster").attr("alt", "週末修繕工作坊，木製品修繕與衣物修補");
        fixed.getElementById("practice-news-decoration").removeAttr("title");
        fixed.getElementById("practice-course-link").attr("aria-label", "查看課程內容");
      } else if (i == 1) {
        fixed.title("課程內容｜週末修繕工作坊");
        fixed.getElementById("practice-summary-button").attr("alt", "查看課程摘要");
        fixed.getElementById("practice-venue-frame").attr("title", "活動中心位置示意");
      } else {
        fixed.selectFirst("html").attr("lang", "zh-Hant");
        fixed.getElementById("practice-name").before("<label for=\"practice-name\">姓名</label>");
        fixed.getElementById("practice-skills").prependElement("legend").text("想學的技能");
      }
      var remaining = failures(fixed);
      require(remaining.isEmpty(), "Corrections did not clear A rules on page " + (i + 1) + ": " + remaining);
      System.out.println("Page " + (i + 1) + " corrected control: no A-rule failures");
    }
  }
}
