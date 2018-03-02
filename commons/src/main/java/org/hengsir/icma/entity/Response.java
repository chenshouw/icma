package org.hengsir.icma.entity;

import java.util.List;

/**
 * @author hengsir
 * @date 2018/1/5 上午10:07
 */
public class Response {

    /**
     * session_id : 383
     * results : [{"candidates":[{"person_id":"p1","face_id":"0001","confidence":63,"tag":""},{"person_id":"p2","face_id":"00002","confidence":35,"tag":""}],"face_rect":{"x":100,"y":100,"width":200,"height":200}}]
     * errorcode : 0
     * erromsg : OK
     * group_size : 1000
     * time_ms : 687
     */

    private String session_id;
    private int errorcode;
    private String erromsg;
    private int group_size;
    private int time_ms;
    private List<ResultsBean> results;

    public String getSession_id() {
        return session_id;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public int getErrorcode() {
        return errorcode;
    }

    public void setErrorcode(int errorcode) {
        this.errorcode = errorcode;
    }

    public String getErromsg() {
        return erromsg;
    }

    public void setErromsg(String erromsg) {
        this.erromsg = erromsg;
    }

    public int getGroup_size() {
        return group_size;
    }

    public void setGroup_size(int group_size) {
        this.group_size = group_size;
    }

    public int getTime_ms() {
        return time_ms;
    }

    public void setTime_ms(int time_ms) {
        this.time_ms = time_ms;
    }

    public List<ResultsBean> getResults() {
        return results;
    }

    public void setResults(List<ResultsBean> results) {
        this.results = results;
    }

    public static class ResultsBean {
        /**
         * candidates : [{"person_id":"p1","face_id":"0001","confidence":63,"tag":""},{"person_id":"p2","face_id":"00002","confidence":35,"tag":""}]
         * face_rect : {"x":100,"y":100,"width":200,"height":200}
         */

        private FaceRectBean face_rect;
        private List<CandidatesBean> candidates;

        public FaceRectBean getFace_rect() {
            return face_rect;
        }

        public void setFace_rect(FaceRectBean face_rect) {
            this.face_rect = face_rect;
        }

        public List<CandidatesBean> getCandidates() {
            return candidates;
        }

        public void setCandidates(List<CandidatesBean> candidates) {
            this.candidates = candidates;
        }

        public static class FaceRectBean {
            /**
             * x : 100
             * y : 100
             * width : 200
             * height : 200
             */

            private int x;
            private int y;
            private int width;
            private int height;

            public int getX() {
                return x;
            }

            public void setX(int x) {
                this.x = x;
            }

            public int getY() {
                return y;
            }

            public void setY(int y) {
                this.y = y;
            }

            public int getWidth() {
                return width;
            }

            public void setWidth(int width) {
                this.width = width;
            }

            public int getHeight() {
                return height;
            }

            public void setHeight(int height) {
                this.height = height;
            }
        }

        public static class CandidatesBean {
            /**
             * person_id : p1
             * face_id : 0001
             * confidence : 63
             * tag :
             */

            private String person_id;
            private String face_id;
            private int confidence;
            private String tag;

            public String getPerson_id() {
                return person_id;
            }

            public void setPerson_id(String person_id) {
                this.person_id = person_id;
            }

            public String getFace_id() {
                return face_id;
            }

            public void setFace_id(String face_id) {
                this.face_id = face_id;
            }

            public int getConfidence() {
                return confidence;
            }

            public void setConfidence(int confidence) {
                this.confidence = confidence;
            }

            public String getTag() {
                return tag;
            }

            public void setTag(String tag) {
                this.tag = tag;
            }
        }
    }
}
